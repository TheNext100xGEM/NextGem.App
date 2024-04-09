import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import { Children, ReactNode, useRef } from "react"
import "./_marquee.scss"

export interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right"
}

export const Marquee = ({ children, direction = "left" }: MarqueeProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<GSAPTween | null>(null)
  const countItems = Children.count(children)
  const factor = 5
  const duration = countItems * factor

  useGSAP(() => {
    animationRef.current = gsap.fromTo(
      contentRef.current,
      { x: "0%" },
      {
        x: direction == "left" ? "-50%" : "50%",
        repeat: -1,
        duration,
        ease: "none"
      }
    )
  })

  const handleMouseEnter = () => {
    gsap.to(animationRef.current, { timeScale: 0.25, duration: 1 })
  }

  const handleMouseLeave = () => {
    gsap.to(animationRef.current, { timeScale: 1, duration: 1 })
  }

  return (
    <div
      className={clsx("marquee", {
        "marquee-right": direction === "right"
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={contentRef} className='marquee-content'>
        {children}
        {children}
      </div>
    </div>
  )
}
