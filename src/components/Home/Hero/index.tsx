import Scene from "@components/3D"
import { Button, OpenAppButton } from "@components/ui"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import "./_hero.scss"

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.timeScale(1.6)
    tl.from(
      ".hero canvas",
      { opacity: 0, duration: 0.5, ease: "power1.out", delay: 1 },
      "a"
    )
      .from(
        ".hero .sub-title",
        { y: 100, opacity: 0, duration: 1, ease: "power1.out", delay: 2.5 },
        "a"
      )
      .from(
        ".hero h1",
        { y: 100, opacity: 0, duration: 1, ease: "power1.out", delay: 2.75 },
        "a"
      )
      .from(
        ".hero .intro",
        { y: 100, opacity: 0, duration: 1, ease: "power1.out", delay: 3 },
        "a"
      )
      .from(
        ".hero .point",
        { opacity: 0, duration: 1, ease: "power1.out", delay: 3 },
        "a"
      )
      .from(
        ".hero .btn-group, .hero .analyse",
        {
          scale: 1.5,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
          delay: 3.25
        },
        "a"
      )
      .from(
        ".hero .lines",
        {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
          delay: 3.25
        },
        "a"
      )
      .from(
        ".hero .hero-back-light",
        { opacity: 0, duration: 2, ease: "power1.out", delay: 3.5 },
        "a"
      )
      .from(
        ".hero .hero-back-gradient",
        { opacity: 0, duration: 2, ease: "power1.out", delay: 2 },
        "a"
      )

    const hero = gsap.timeline({
      scrollTrigger: {
        trigger: "#root",
        start: "top top",
        endTrigger: ".hero",
        end: "bottom top",
        scrub: true
      }
    })
    hero.timeScale(1.6)
    hero.to(".hero-back canvas", { y: "25%", ease: "none" })
  })

  const lineButton = [
    {
      id: "l1",
      width: 833,
      height: 245,
      path: "M832 244L763 175H588L526 113H364L252 1H-100"
    },
    {
      id: "l2",
      width: 814,
      height: 250,
      path: "M814 137H687L654 104H500L449 53H236L184 1H-86 M687 137L625 199H437L385.5 147.5H249L147 249.5H-57"
    },
    {
      id: "l3",
      width: 815,
      height: 126,
      path: "M814 1H752L677 76H555C552 73 535 56 535 56C535 56 439 54.3333 391 56L322 125H240L217.5 102.5H-111 M814 1L766.5 48.5H705"
    },
    {
      id: "l4",
      width: 816,
      height: 143,
      path: "M1 110H41L73 142H160L205.5 96.5H345L390.5 51H577L611 17H937 M345 96L379.5 130.5H489L517.5 102H851 M1 109.5L32.5 78H138L215 1H517L567.5 51.5"
    },
    {
      id: "l5",
      width: 833,
      height: 129,
      path: "M1 1L37 37H134L180 83H511L581.5 12.5H960 M511 83L556.5 128.5H626L661 93.5H919"
    }
  ]

  const getRandomDur = () => Math.random() * (12 - 7) + 7

  return (
    <div className='hero'>
      <div className='wrapper'>
        <div className='content'>
          <div className='sub-title'>Welcome</div>
          <h1>
            <small>
              <strong>AI-Powered</strong> Insights for
            </small>{" "}
            Smart Crypto Choices.
          </h1>
          <div className='intro'>
            <p>
              Leveraging the most powerful artificial intelligence, we track and
              analyze crypto projects, making it easy for you to spot the next
              big success.
              <br /> Let's find the next gems together.
            </p>
          </div>
          <div className='btn-group'>
            <div className='point'></div>
            <OpenAppButton />
            <div className='lines'>
              <div className='lines-wrapper'>
                <OpenAppButton />
                <div className='lines-wrapper-container'>
                  {lineButton.map((line) => (
                    <svg
                      key={line.id}
                      className={line.id}
                      width={line.width}
                      height={line.height}
                      viewBox={`0 0 ${line.width} ${line.height}`}
                    >
                      <path id={line.id} d={line.path} />
                      {Array.from({ length: 2 }, (_, i) => (
                        <circle key={i} cx='0' cy='0' r='3' data-id={i}>
                          <animateMotion
                            dur={`${getRandomDur()}s`}
                            repeatCount='indefinite'
                          >
                            <mpath href={`#${line.id}`} />
                          </animateMotion>
                        </circle>
                      ))}
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='analyse'>
            <Button href='/analyze' icon='mage:stars-c'>
              Analysed now
            </Button>
          </div>
        </div>
      </div>
      <div className='hero-back'>
        <Scene id='DP89lvzX47C69zjM' />
        <div className='hero-back-light' />
        <div className='hero-back-gradient' />
        <div className='point' />
      </div>
    </div>
  )
}

export default Hero
