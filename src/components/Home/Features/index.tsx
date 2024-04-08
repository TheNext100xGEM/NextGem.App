import analysisSrc from "@assets/img/home/ai-analysis.png"
import aiSrc from "@assets/img/home/ai-chat.png"
import rankedSrc from "@assets/img/home/ai-ranked.png"
import bgSrc from "@assets/img/home/bg-features.png"
import stakingSrc from "@assets/img/home/staking-burn.png"
import Sprite from "@components/Sprite"
import { Corner, Picture } from "@components/ui"
import { SITE_NAME } from "@constants/index"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CSSProperties, useRef } from "react"
import "./_features.scss"

interface FeatureCardProps {
  number: number
  title: string
  icon: string
  img: React.ReactNode
  children?: React.ReactNode
  color?: string
}

const FeatureCard = ({
  number,
  title,
  children,
  icon,
  img,
  color
}: FeatureCardProps) => {
  const feature = useRef<HTMLDivElement>(null)
  const featureImg = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      featureImg.current,
      { y: -40 },
      {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: feature.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div
      className='feature'
      style={{ "--color": `var(--${color})` } as CSSProperties}
      ref={feature}
    >
      <div className='feature-left'>
        <div className='number' data-reveal='top'>
          {number}
        </div>
        <hr />
        <div className='icon' data-reveal='top'>
          <Sprite id={icon} viewBox={"0 0 40 41"} />
          <Corner />
        </div>
        <h3 className='color' data-reveal='bottom'>
          {title}
        </h3>
        <div className='p' data-reveal='bottom'>
          {children}
        </div>
      </div>
      <div className='feature-right' data-reveal>
        <div ref={featureImg}>{img}</div>
      </div>
      <div className='point'></div>
      <Corner />
    </div>
  )
}

const Features = () => {
  return (
    <div className='features'>
      <div className='wrapper'>
        <div className='heading content'>
          <div className='sub-title' data-reveal='bottom'>
            Our features
          </div>
          <h2 className='h1' data-reveal='bottom'>
            <small>
              Explore all the <strong>features</strong>
            </small>{" "}
            of {SITE_NAME}
          </h2>
          <div className='point'></div>
          <Picture src={bgSrc} width='1235' height='937' alt='Home' />
        </div>
        <div className='list'>
          <FeatureCard
            number={1}
            title='AI Chat'
            icon='chat'
            color='pink'
            img={<Picture src={aiSrc} width='736' height='421' alt='AI Chat' />}
          >
            Nam sole orto magnitudine angusti gurgitis sed profundi a transitu
            arcebantur et dum piscatorios.
          </FeatureCard>
          <FeatureCard
            number={2}
            title='AI Ranked'
            icon='list'
            color='yellow'
            img={
              <Picture
                src={rankedSrc}
                width='761'
                height='421'
                alt='AI Ranked'
              />
            }
          >
            Nam sole orto magnitudine angusti gurgitis sed profundi a transitu
            arcebantur et dum piscatorios.
          </FeatureCard>
          <FeatureCard
            number={3}
            title='AI Analysis'
            icon='stars'
            color='blue'
            img={
              <Picture
                src={analysisSrc}
                width='761'
                height='407'
                alt='AI Analysis'
              />
            }
          >
            Nam sole orto magnitudine angusti gurgitis sed profundi a transitu
            arcebantur et dum piscatorios.
          </FeatureCard>
          <FeatureCard
            number={4}
            title='Staking & Burn'
            icon='fire'
            color='orange'
            img={
              <Picture
                src={stakingSrc}
                width='761'
                height='421'
                alt='Staking & Burn'
              />
            }
          >
            Nam sole orto magnitudine angusti gurgitis sed profundi a transitu
            arcebantur et dum piscatorios.
          </FeatureCard>
        </div>
      </div>
    </div>
  )
}

export default Features
