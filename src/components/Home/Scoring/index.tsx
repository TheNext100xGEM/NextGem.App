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
              Community <strong>Sentiment Analysis</strong> combining
            </small>{" "}
            Real-Time Insights with AI
          </h2>
          <div className='intro' data-reveal='bottom'>
            <p>
            Explore the core of crypto communities with our AI analysis. We look at the most recent messages from each project's channels to understand true feelings. This way, we can tell real excitement from simple airdrop waiting. With this insight, plus a score based on social media activities, you get to know the real vibe and quality of the community.
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
