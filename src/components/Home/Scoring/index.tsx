import arrowSrc from "@assets/img/home/arrow.png"
import bgSrc from "@assets/img/home/bg-sentiment.png"
import { OpenAppButton, Picture } from "@components/ui"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import "./_scoring.scss"

const Scoring = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".scoring .bck img",
      { y: "-15%" },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: ".scoring .bck",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div className='scoring'>
      <div className='wrapper'>
        <div className='heading content'>
          <div className='sub-title' data-reveal='bottom'>
            Community scoring
          </div>
          <h2 className='h1' data-reveal='bottom'>
            <small>
              Persisting <strong>community scoring</strong> combining
            </small>{" "}
            AI sentiment analysis
          </h2>
          <div className='intro' data-reveal='bottom'>
            <p>
              Nam sole orto magnitudine angusti gurgitis sed profundi a transitu
              arcebantur et dum piscatorios. Nam sole orto magnitudine angusti
              gurgitis sed profundi a transitu arcebantur et dum piscatorios.
            </p>
          </div>
          <div className='btn-group' data-reveal='bottom'>
            <OpenAppButton />
          </div>
          <div className='point'></div>
        </div>
        <div className='arrow'>
          <Picture
            src={arrowSrc}
            width='884'
            height='664'
            alt='Arrow Scoring'
            data-reveal
          />
          <div className='point'></div>
        </div>
        <Picture
          src={bgSrc}
          width='1800'
          height='1064'
          alt='Scoring'
          classPicture='bck'
        />
      </div>
    </div>
  )
}

export default Scoring
