import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import moment from "moment"
import { Line } from "react-chartjs-2"
import "./_sentimentAnalysis.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const apiData = [
  {
    date: moment().subtract(6, "day").format("dddd"),
    value: 40,
    chats: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed eleifend justo sit amet nisl tempor accumsan.",
      "Aenean porta diam at mauris interdum pretium.",
      "Pellentesque vel nulla in ante gravida malesuada."
    ]
  },
  {
    date: moment().subtract(5, "day").format("dddd"),
    value: 23,
    chats: [
      "Pellentesque vel nulla in ante gravida malesuada.",
      "Vivamus et sem vitae felis ornare lobortis id ac massa."
    ]
  },
  {
    date: moment().subtract(4, "day").format("dddd"),
    value: 64,
    chats: [
      "Duis semper orci in consequat viverra.",
      "Sed quis metus sodales, bibendum nulla id, consequat metus.",
      "Morbi auctor libero sit amet dictum consectetur.",
      "Nunc pretium nisl vel mauris scelerisque ornare."
    ]
  },
  {
    date: moment().subtract(3, "day").format("dddd"),
    value: 4,
    chats: [
      "Etiam pulvinar metus a velit ullamcorper, a mattis est ultricies.",
      "Maecenas vitae elit vel neque egestas pharetra eget at quam.",
      "Nulla condimentum lectus ut massa bibendum maximus.",
      "Etiam ac est nec odio tincidunt vulputate."
    ]
  },
  {
    date: moment().subtract(2, "day").format("dddd"),
    value: 90,
    chats: [
      "Aenean blandit erat imperdiet tellus mattis pulvinar.",
      "Mauris rutrum lacus id justo gravida, id bibendum nulla iaculis."
    ]
  },
  {
    date: moment().subtract(1, "day").format("dddd"),
    value: 48,
    chats: [
      "Ut ut justo ut nisl aliquam dictum vel a enim.",
      "Aliquam mattis massa nec diam congue, nec porttitor erat iaculis.",
      "Aliquam dignissim libero nec eros gravida feugiat.",
      "In tempus velit ut arcu euismod efficitur."
    ]
  },
  {
    date: moment().format("dddd"),
    value: 25,
    chats: [
      "Etiam ac lacus sed massa imperdiet rhoncus et ut urna.",
      "Morbi eu purus non lorem commodo feugiat et eu justo.",
      "In tincidunt lectus sit amet tristique placerat."
    ]
  }
]

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div")

  if (!tooltipEl) {
    tooltipEl = document.createElement("div")
    tooltipEl.classList.add("SentimentAnalysis-tooltip")

    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(chart)

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  const currentData = apiData.find((val) => val.date === tooltip.title[0])
  const currentIndex = apiData.findIndex((val) => val.date === tooltip.title[0])

  tooltipEl.dataset.index = currentIndex

  if (currentData) {
    const title = document.createElement("h3")
    title.innerHTML = "Sentiments"

    const list = document.createElement("ul")
    currentData.chats.forEach((el) => {
      const chat = document.createElement("li")
      chat.innerHTML = el
      list.appendChild(chat)
    })

    const light = document.createElement("div")
    light.classList.add("gem-section-light")

    const corner = document.createElement("div")
    corner.classList.add("corner")
    corner.dataset.colors = "tertiary"

    const cornerLeft = document.createElement("span")
    cornerLeft.classList.add("corner-left")
    const cornerRight = document.createElement("span")
    cornerRight.classList.add("corner-right")
    const cornerTopBottom = document.createElement("span")
    cornerTopBottom.classList.add("corner-top-bottom")

    corner.appendChild(cornerLeft)
    corner.appendChild(cornerRight)
    corner.appendChild(cornerTopBottom)

    tooltipEl.innerHTML = ""

    tooltipEl.appendChild(title)
    tooltipEl.appendChild(list)
    tooltipEl.appendChild(light)
    tooltipEl.appendChild(corner)
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  tooltipEl.style.opacity = 1
  tooltipEl.style.left = positionX + tooltip.caretX + "px"
  tooltipEl.style.top = positionY + tooltip.caretY + "px"
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false,
      position: "nearest",
      external: externalTooltipHandler
    }
  },
  elements: {
    point: {
      pointRadius: 5
    }
  }
}

const labels = apiData.map((val) => val.date)

const data = {
  labels,
  datasets: [
    {
      data: apiData.map((val) => val.value),
      borderColor: "rgb(240, 240, 240)",
      backgroundColor: "rgb(136, 135, 137)",
      tension: 0.5
    }
  ]
}

export function SentimentAnalysis() {
  return (
    <div className='SentimentAnalysis'>
      <h3>Sentiment analysis</h3>
      <p>Live data from telegram.me</p>
      <div className='SentimentAnalysis-canvas'>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
