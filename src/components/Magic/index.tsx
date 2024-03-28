import { ReactNode, useEffect, useState } from "react"

import StarsChunk from "./StarsChunk.jsx"
import "./_star.scss"

export interface StarType {
  id: number
  xOffset: number
  yOffset: number
  scale: number
  rotation: number
  initRot: number
  opacity: number
  speed: number
  cyclesInitial: number
  cycle: number
}

export default function Magic({
  children,
  ...props
}: {
  children?: ReactNode
}) {
  const maxCycles = 80
  const [stars, setStars] = useState<StarType[]>([])

  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    const totalCycles = maxCycles === undefined ? 100 : maxCycles
    const lowerSpeedBound = (totalCycles * 0.7) / 100
    const upperSpeedBound = (totalCycles * 2.5) / 100
    const lowerScaleBound = (totalCycles * 3) / 100
    const upperScaleBound = (totalCycles * 25) / 100

    function calculateCycle(star: StarType) {
      const rotationDegrees = star.initRot / (((Math.PI * 1) / 360) * 2)
      const changeVector = [
        Math.cos((rotationDegrees * Math.PI) / 180) * star.speed,
        Math.sin((rotationDegrees * Math.PI) / 180) * star.speed * -1
      ]
      star.xOffset += changeVector[0]

      star.yOffset += changeVector[1] * -1
      star.opacity -= star.speed / star.cyclesInitial
      star.cycle -= star.speed
      star.rotation += star.initRot < 180 ? star.speed : star.speed * -1
      star.scale -= star.speed / star.cyclesInitial

      if (star.cycle < 0) {
        const initRot = getRndInteger(0, 360)
        const lowerSpeedBound = (totalCycles * 0.7) / 100
        const upperSpeedBound = (totalCycles * 2.5) / 100

        star.opacity = 1
        star.xOffset = getRndInteger(-50, 50)
        star.yOffset = 0
        star.scale = getRndInteger(lowerScaleBound, upperScaleBound) / 10
        star.rotation = initRot
        star.initRot = initRot
        star.speed = getRndInteger(lowerSpeedBound, upperSpeedBound)
        star.cyclesInitial = totalCycles
        star.cycle = totalCycles
      }

      return star
    }

    function genNewStar(i: number) {
      const initRot = getRndInteger(0, 360)

      return {
        id: i,
        xOffset: getRndInteger(-50, 50),
        yOffset: 0,
        scale: getRndInteger(lowerScaleBound, upperScaleBound) / 10,
        rotation: initRot,
        initRot: initRot,
        opacity: 1,
        speed: getRndInteger(lowerSpeedBound, upperSpeedBound),
        cyclesInitial: totalCycles,
        cycle: totalCycles
      }
    }

    function renderStars() {
      setStars((prevStars: StarType[]) => {
        const newStars = [...prevStars]
        newStars.map((x) => calculateCycle(x))
        //console.log(newStars[0]);
        return newStars
      })
    }

    for (let i = 0; i < 14; i++) {
      setStars((prevStars: StarType[]) => {
        return [...prevStars, genNewStar(i)]
      })
    }

    const interval = setInterval(function () {
      renderStars()
    }, 1000 / 60)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div {...props} className={"magicWordContainer"}>
      {children}
      <div className='starContainer'>
        <StarsChunk stars={stars.slice(0, 14)} />
      </div>
    </div>
  )
}
