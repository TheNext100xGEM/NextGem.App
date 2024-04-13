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

        let topComments, scoreJustification
        if (comments && param.time && comments[param.time as string]) {
          topComments = comments[param.time as string].topComments.map(
            (com) => com.message
          )
          scoreJustification = comments[param.time as string].scoreJustification
        }

        toolTip.innerHTML = `
          <h5>Sentiments</h5>
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
            comments && topComments
              ? `
            <h5>Live comments</h5>
            <ul>
              ${topComments.map((com) => `<li>${com}</li>`).join("")}
            </ul>
            ${
              scoreJustification
                ? `<div class="SentimentAnalysis-tooltip-score">
              <h6 class="color">
              AI score justification
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--tabler" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2m0-12a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2M9 18a6 6 0 0 1 6-6a6 6 0 0 1-6-6a6 6 0 0 1-6 6a6 6 0 0 1 6 6"></path></svg>
              </h6>
              <p>${scoreJustification}</p>
              <div class="corner" data-colors="secondary">
              <div class="corner-left"></div>
              <div class="corner-right"></div>
              <div class="corner-top-bottom"></div>
            </div>
            </div>
            `
                : ""
            }
            `
              : ""
          }

          <div class="corner" data-colors="tertiary">
            <div class="corner-left"></div>
            <div class="corner-right"></div>
            <div class="corner-top-bottom"></div>
          </div>
        `

        const x =
          param.point.x > container.clientWidth / 2
            ? param.point.x - 360 - 20
            : param.point.x + 20

        toolTip.style.left = x + "px"
        toolTip.style.top = param.point.y + "px"
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
