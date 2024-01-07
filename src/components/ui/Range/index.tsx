import './_range.scss'
import { FC, useCallback, useEffect, useState, useRef, ChangeEvent } from 'react'

interface PropsRange {
  min: number
  max: number
  step?: number
  onChange: (values: { min: number; max: number }) => void
}

const Range: FC<PropsRange> = ({ min, max, step = 1, onChange }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const slider = useRef<HTMLDivElement>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (slider.current) {
      slider.current.style.left = `${minPercent}%`
      slider.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (slider.current) {
      slider.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    onChange({ 
      min: minVal, 
      max: maxVal 
    })
  }, [minVal, maxVal, onChange])

  return (
    <>
      <div className="range">
        <div className="range-wrapper">
          <div className="range-track" />
          <div ref={slider} className="range-slider" />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = Math.min(Number(e.target.value), maxVal - 1)
              setMinVal(value)
              minValRef.current = value
            }}
            className="range-thumb range-thumb-left"
            style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = Math.max(Number(e.target.value), minVal + 1)
              setMaxVal(value)
              maxValRef.current = value
            }}
            className="range-thumb range-thumb-right"
          />
        </div>
        <div className="range-left">{minVal}</div>
        <div className="range-right">{maxVal}</div>
      </div>
    </>
  )
}

export default Range
