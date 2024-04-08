import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const useReveal = () => {
  useGSAP(() => {
    ScrollTrigger.batch("[data-reveal]", {
      onEnter: (reveal) => {
        gsap.to(reveal, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          stagger: 0.15
        })
      },
      start: "60% bottom"
    })
  })
}
