import { Path, Svg, View, Text } from "@react-pdf/renderer"
import React from "react"

interface TokenomicsProps {
  data: PieChartData
}
type PieChartData = {
  values: number[]
  colors: string[]
  labels: string[]
}

export const Tokenomics: React.FC<TokenomicsProps> = ({ data }) => {
  //drawPieChart([10, 20, 30, 40], ['#ff0000', '#00ff00', '#0000ff', '#ffff00']);
  const { values, colors, labels } = data

  const calculatePath = (
    value: number,
    total: number,
    startAngle: number
  ): string => {
    const sliceAngle = (value / total) * 2 * Math.PI
    const endAngle = startAngle + sliceAngle

    const largeArc = sliceAngle > Math.PI ? 1 : 0
    const startX = 100 * Math.cos(startAngle - Math.PI / 2)
    const startY = 100 * Math.sin(startAngle - Math.PI / 2)
    const endX = 100 * Math.cos(endAngle - Math.PI / 2)
    const endY = 100 * Math.sin(endAngle - Math.PI / 2)

    return [
      `M 0 0`,
      `L ${startX} ${startY}`,
      `A 100 100 0 ${largeArc} 1 ${endX} ${endY}`,
      `L 0 0`
    ].join(" ")
  }

  const total = values.reduce((acc, value) => acc + value, 0)

  let startAngle = 0

  const paths = values.map((value, index) => {
    const d = calculatePath(value, total, startAngle)
    startAngle += (value / total) * 2 * Math.PI
    return <Path key={index} d={d} fill={colors[index]} />
  })

  const renderLegend = (
    labels: string[],
    colors: string[],
    values: number[]
  ) => {
    return labels.map((label, index) => {
      const percentage = ((values[index] / total) * 100).toFixed(2)
      return (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: colors[index],
              marginRight: 10
            }}
          />
          <Text
            style={{ fontSize: 14, fontWeight: 400 }}
          >{`${label} - ${percentage}%`}</Text>
        </View>
      )
    })
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: "8px",
        alignItems: "center"
      }}
    >
      <Svg id='pieChart' width='200' height='200' viewBox='-100 -100 200 200'>
        {paths}
      </Svg>
      <View style={{ marginLeft: "32px", gap: "8px" }}>
        {renderLegend(labels, colors, values)}
      </View>
    </View>
  )
}
