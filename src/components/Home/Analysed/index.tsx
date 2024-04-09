import bgSrc from "@assets/img/home/bg-analysed.png"
import { Button, Marquee, Picture } from "@components/ui"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Link } from "react-router-dom"

import "./_analysed.scss"
import { LogoListBottom, LogoListTop, LogoProps } from "./list"

const Logo = ({ name, logo, url }: LogoProps) => {
  return (
    <Link className='logo' to={url} /* target='_blank' rel='noopener noreferrer' */>
      <Picture src={logo} width='200' height='200' alt={name} />
    </Link>
  )
}

interface LogoListProps {
  list: LogoProps[]
  direction?: "left" | "right"
}

const LogoList = ({ list, direction = "left" }: LogoListProps) => {
  return (
    <Marquee direction={direction}>
      {list.map((partner, index) => (
        <Logo key={index} {...partner} />
      ))}
    </Marquee>
  )
}

const Analysed = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".analysed .bck img",
      { y: "15%" },
      {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: ".analysed .bck",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div className='analysed'>
      <Picture
        src={bgSrc}
        width='1800'
        height='1467'
        alt='Trade'
        classPicture='bck'
      />
      <div className='wrapper'>
        <div className='heading content'>
          <div className='sub-title' data-reveal='bottom'>
            AI-Powered
          </div>
          <h2 className='h1' data-reveal='bottom'>
            <small>
              The first <strong>artificial intelligence</strong> protocol
            </small>{" "}
            that analyzes crypto gems
          </h2>
          <div className='intro' data-reveal='bottom'>
            <p>
              Already <span>+6000 projects analyzed</span> on our protocol
            </p>
          </div>
          <LogoList list={LogoListTop} />
          <LogoList list={LogoListBottom} direction='right' />
          <div className='btn-group' data-reveal='bottom'>
            <Button href='/gems'>See all Analyzes</Button>
            <div className='point'></div>
          </div>
          <div className='point'></div>
        </div>
      </div>
    </div>
  )
}

export default Analysed
