import {
  SentimentScorings,
  SentimentScoringsComments
} from "@models/SentimentScorings"
import {
  createChart,
  ColorType,
  CrosshairMode,
  LineStyle,
  LineType
} from "lightweight-charts"
import { useEffect, useRef } from "react"
import "./_sentimentAnalysis.scss"
import { useQuery } from "@tanstack/react-query"
import { getSentimentScoringsComments } from "../../queries/api"
import Corner from "@components/ui/Corner"

export const ChartComponent = ({
  data,
  comments
}: {
  data: SentimentScorings
  comments?: SentimentScoringsComments
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (!chartContainerRef.current) return

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth
      })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "rgba(0,0,0,0.4)" },
        textColor: "rgb(136, 135, 137)"
      },
      grid: {
        horzLines: {
          color: "rgba(255,255,255,.1)"
        },
        vertLines: {
          color: "rgba(255,255,255,.1)"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255,255,255,.4)",
          style: LineStyle.LargeDashed,
          labelBackgroundColor: "#FFFFFF"
        },
        horzLine: {
          color: "rgba(255,255,255,.4)",
          labelBackgroundColor: "#FFFFFF"
        }
      },
      width: chartContainerRef.current.clientWidth,
      height: 300
    })

    const bullVsBearData = data.scores.map((score) => ({
      time: score.date,
      value: score.bullVsBear
    }))
    const bullVsBearSerie = chart.addAreaSeries({
      lineColor: "rgba(41, 98, 255, 1)",
      topColor: "transparent",
      bottomColor: "transparent",
      lineType: LineType.Curved
    })
    bullVsBearSerie.setData(bullVsBearData)

    const emotionalChargeData = data.scores.map((score) => ({
      time: score.date,
      value: score.emotionalCharge
    }))
    const emotionalChargeSerie = chart.addAreaSeries({
      lineColor: "rgba(255, 41, 98, 1)",
      topColor: "transparent",
      bottomColor: "transparent",
      lineType: LineType.Curved
    })
    emotionalChargeSerie.setData(emotionalChargeData)

    const interactionQualityData = data.scores.map((score) => ({
      time: score.date,
      value: score.interactionQuality
    }))
    const interactionQualitySerie = chart.addAreaSeries({
      lineColor: "rgba(98, 255, 41, 1)",
      topColor: "transparent",
      bottomColor: "transparent",
      lineType: LineType.Curved
    })
    interactionQualitySerie.setData(interactionQualityData)

    const container = document.getElementById("sentiment-analysis")

    if (!container) return

    const toolTipWidth = 80
    const toolTipHeight = 80
    const toolTipMargin = 15

    const toolTip = document.createElement("div")
    toolTip.classList.add("SentimentAnalysis-tooltip")
    container.querySelector(".SentimentAnalysis-tooltip")?.remove()
    container.appendChild(toolTip)

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none"
      } else {
        toolTip.style.display = "block"

        type TimeData = {
          time: string
          value: number
        }

        const ttBullVsBearData = param.seriesData.get(
          bullVsBearSerie
        ) as TimeData
        const ttEmotionalChargeData = param.seriesData.get(
          emotionalChargeSerie
        ) as TimeData
        const ttInteractionQualityData = param.seriesData.get(
          interactionQualitySerie
        ) as TimeData

        let ttComments
        if (comments && param.time && comments[param.time as string]) {
          ttComments = comments[param.time as string].topComments.map(
            (com) => com.message
          )
        }

        toolTip.innerHTML = `
          <h4>Sentiments</h4>
          <ul>
            <li style="color: rgba(41, 98, 255, 1);">Bull vs Bear: <b>${
              ttBullVsBearData.value
            }</b></li>
            <li style="color: rgba(255, 41, 98, 1);">Emotional charge: <b>${
              ttEmotionalChargeData.value
            }</b></li>
            <li style="color: rgba(98, 255, 41, 1);">Interaction quality: <b>${
              ttInteractionQualityData.value
            }</b></li>
          </ul>
          ${
            ttComments
              ? `
            <h4>Live comments</h4>
            <ul>
              ${ttComments.map((com) => `<li>${com}</li>`).join("")}
            </ul>
            `
              : ""
          }

          <div class="corner" data-colors="tertiary">
            <div class="corner-left"></div>
            <div class="corner-right"></div>
            <div class="corner-top-bottom"></div>
          </div>
        `

        const y = param.point.y
        let left = param.point.x + toolTipMargin
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth
        }

        let top = y + toolTipMargin
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin
        }
        toolTip.style.left = left + "px"
        toolTip.style.top = top + "px"
      }
    })

    const rangeVisible = window.innerWidth < 768 ? 10 : 30

    chart.timeScale().setVisibleLogicalRange({
      from: data.scores[data.scores.length - rangeVisible]
        ? data.scores.length - rangeVisible
        : 0,
      to: data.scores.length - 1
    })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      chart.remove()
    }
  }, [data, comments])

  return <div ref={chartContainerRef} />
}

export function SentimentAnalysis({
  data,
  telegramLink
}: {
  data: SentimentScorings
  telegramLink?: string
}) {
  const qSentimentScoringsComments = useQuery({
    queryKey: ["sentimentScoringsComments"],
    queryFn: () => getSentimentScoringsComments({ url: data.textFile })
  })

  return (
    <div className='SentimentAnalysis' id='sentiment-analysis'>
      <h3>Sentiment analysis</h3>
      {telegramLink && (
        <p className='SentimentAnalysis-source'>
          <span className='ping'>
            <span className='animate live'></span>
            <span className='bg live'></span>
          </span>
          Live data from{" "}
          <a href={telegramLink} target='_blank'>
            {telegramLink.replace("https://", "")}
          </a>
        </p>
      )}
      <div className='SentimentAnalysis-canvas'>
        <ChartComponent
          data={data}
          comments={qSentimentScoringsComments.data}
        ></ChartComponent>
        <Corner />
      </div>
    </div>
  )
}
