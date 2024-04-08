import bgSrc from "@assets/img/home/bg-uniswap.png"
import uniswapSrc from "@assets/img/home/uniswap-gemai.png"
import { Button, BuyNextGemButton, Corner, Picture } from "@components/ui"
import { TOKEN_NAME } from "@constants/index"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import "./_trade.scss"

const Trade = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".trade .bck img",
      { y: "-15%" },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: ".trade .bck",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
    gsap.fromTo(
      ".trade .logos img",
      { y: "15%", rotate: 0 },
      {
        y: "-15%",
        rotate: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".trade .logos",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div className='trade'>
      <div className='wrapper'>
        <div className='trade-content'>
          <div className='heading content'>
            <div className='sub-title' data-reveal='bottom'>
              Trade Next
            </div>
            <h2 className='h1' data-reveal='bottom'>
              <small>
                Buy <strong>${TOKEN_NAME}</strong>
              </small>{" "}
              on Uniswap
            </h2>
            <div className='btn-group' data-reveal='bottom'>
              <BuyNextGemButton />
              <Button href='/presale'>Join presale</Button>
            </div>
            <div className='point'></div>
          </div>
          <div className='logos'>
            <Picture
              src={uniswapSrc}
              width='637'
              height='397'
              alt='Buy GemAI Token on Uniswap'
              data-reveal
            />
          </div>
          <Corner />
          <div className='light'></div>
        </div>
        <Picture
          src={bgSrc}
          width='1800'
          height='937'
          alt='Trade'
          classPicture='bck'
        />
      </div>
    </div>
  )
}

export default Trade
