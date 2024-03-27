import "./_portal.scss"
import { Grid, Corner, Button } from "@components/ui"
import { SITE_NAME, SOUND_OPEN_APP } from "@constants/index"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

const trendingCategories = [
  {
    name: "Solana Memes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=11&noteMin=1&noteMax=10&chains=solana&viewMode=grid",
    color: "#84cc16",
    backgroundImageUrl: "https://cdn.frankerfacez.com/emoticon/439694/4"
  },
  {
    name: "Ethereum DeFi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=5&noteMin=1&noteMax=10&chains=ethereum&viewMode=grid",
    color: "blueviolet",
    backgroundImageUrl:
      "https://ethereum.org/_ipx/w_256,q_75/%2F_next%2Fstatic%2Fmedia%2Fimpact_transparent.7420c423.png?q=75&url=%2F_next%2Fstatic%2Fmedia%2Fimpact_transparent.7420c423.png&w=256"
  },
  {
    name: "AI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=22&noteMin=1&noteMax=10&viewMode=grid",
    color: "#22d3ee",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/robot_1f916.png"
  },
  {
    name: "Zero-Knowledge (ZK)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=14&noteMin=1&noteMax=10&viewMode=grid",
    color: "#3b82f6",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/books_1f4da.png"
  },
  {
    name: "To Be Launched",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?",
    color: "#f97316",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/rocket_1f680.png"
  },
  {
    name: "Metaverse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=16&noteMin=1&noteMax=10&viewMode=grid",
    color: "deeppink",
    backgroundImageUrl:
      "https://em-content.zobj.net/source/apple/391/alien-monster_1f47e.png"
  }
]

const GemsPortal = () => {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Gems Portal</title>
      </Helmet>

      <div className='portal'>
        <div className='section'>
          <h5 className='portal-heading'>Trending Categories</h5>
          <Grid>
            {trendingCategories.map((category, index) => (
              <Link
                to={category.link}
                className='category'
                style={
                  {
                    "--category-color": category.color,
                    "--category-bg-image": `url(${category.backgroundImageUrl})`
                  } as React.CSSProperties
                }
                key={`trending-cat-${index}`}
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
