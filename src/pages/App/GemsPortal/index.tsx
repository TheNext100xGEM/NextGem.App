import "./_portal.scss"
import { Grid, Corner, Button } from "@components/ui"
import StarAnimation from "@components/ui/StarAnimation"
import {
  SITE_NAME,
  SOUND_OPEN_APP,
  SOUND_BUTTON_HOVER,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

const trendingCategories = [
  /* {
    name: "Solana Memes",
    description:
      "Where cryptocurrency meets comedy club. Invest in chuckles and watch your portfolio do stand-up on the blockchain.",
    link: "/gems?categories=11&noteMin=1&noteMax=10&chains=solana&viewMode=grid",
    color: "#84cc16",
    backgroundImageUrl: "https://cdn.frankerfacez.com/emoticon/439694/4"
  }, */
  {
    name: "Ethereum DeFi",
    description:
      "A playground for financial enthusiasts where banks are as necessary as a landline. Your wallet, your rules.",
    link: "/gems?categories=5&noteMin=1&noteMax=10&chains=ethereum&viewMode=grid",
    color: "#a855f7",
    backgroundImageUrl:
      "https://ethereum.org/_ipx/w_256,q_75/%2F_next%2Fstatic%2Fmedia%2Fimpact_transparent.7420c423.png?q=75&url=%2F_next%2Fstatic%2Fmedia%2Fimpact_transparent.7420c423.png&w=256"
  },
  {
    name: "AI",
    description:
      "Where silicon brains meet digital gold. The future where AI does more than just answer your emails—it grows your portfolio.",
    link: "/gems?categories=22&noteMin=1&noteMax=10&viewMode=grid",
    color: "#22d3ee",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/robot_1f916.png"
  },
  {
    name: "Zero-Knowledge (ZK)",
    description:
      "Dive into the shadow realm of blockchain, where transactions whisper secrets without ever raising their voice. Privacy meets progress, no compromises.",
    link: "/gems?categories=14&noteMin=1&noteMax=10&viewMode=grid",
    color: "#3b82f6",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/books_1f4da.png"
  },
  {
    name: "To Be Launched",
    description:
      "Your passport to tomorrow's blockchain marvels. Uncharted tech territories await, with each token a potential revolution in your pocket.",
    link: "/gems?launchStatus=0%2C1&noteMin=1&noteMax=10&viewMode=grid",
    color: "#f97316",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/rocket_1f680.png"
  },
  {
    name: "Metaverse",
    description:
      "Where your portfolio goes beyond the blockchain — it enters realms of virtual reality, gaming, and digital frontiers untapped and unexplored.",
    link: "/gems?categories=16&noteMin=1&noteMax=10&viewMode=grid",
    color: "deeppink",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/alien-monster_1f47e.png"
  }
]

const GemsPortal = () => {
  const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
    volume: VOLUME_BUTTON_HOVER
  })

  const isTotalOdd = trendingCategories.length % 2 !== 0

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Gems Portal</title>
      </Helmet>

      <div className='portal'>
        <div className='section'>
          <StarAnimation />
          <h5 className='portal-heading'>Trending Categories</h5>
          <Grid>
            {trendingCategories.map((category, index) => (
              <Link
                to={category.link}
                className={`category ${isTotalOdd && index === trendingCategories.length - 1 ? 'last-odd-item' : ''}`}
                style={
                  {
                    "--category-color": category.color,
                    "--category-bg-image": `url(${category.backgroundImageUrl})`
                  } as React.CSSProperties
                }
                key={`trending-cat-${index}`}
                onMouseEnter={soundHover}
              >
                <div className='squares'>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                  <div className='square'></div>
                </div>
                <div className='content'>
                  <h6>{category.name}</h6>
                  <div className='desc'>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className='category-light' />
                <div className='category-before' />
                <div className='category-bg' />
                <Corner color='secondary' />
              </Link>
            ))}
          </Grid>
        </div>
        <div className='section'>
          <Button
            href='/gems'
            icon='carbon:text-mining-applier'
            pathSoundClick={SOUND_OPEN_APP}
          >
            View all gems
          </Button>
        </div>
      </div>
    </>
  )
}

export default GemsPortal
