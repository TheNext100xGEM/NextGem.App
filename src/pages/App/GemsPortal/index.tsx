import "./_portal.scss"
import { Grid, Corner } from "@components/ui"
import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

const trendingCategories = [
  {
    name: "Solana Memes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=11&noteMin=1&noteMax=10&chains=solana&viewMode=grid"
  },
  {
    name: "Ethereum DeFi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=5&noteMin=1&noteMax=10&chains=ethereum&viewMode=grid"
  },
  {
    name: "AI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=22&noteMin=1&noteMax=10&viewMode=grid"
  },
  {
    name: "Zero-Knowledge (ZK)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=14&noteMin=1&noteMax=10&viewMode=grid"
  },
  {
    name: "To Be Launched",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?"
  },
  {
    name: "Metaverse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit convallis elit in convallis.",
    link: "/gems?categories=16&noteMin=1&noteMax=10&viewMode=grid"
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
          <h5>Trending Categories</h5>
          <Grid>
            {trendingCategories.map((category) => (
              <div className='category'>
                <div className='content'>
                  <div className='category-header'>
                    <h6>{category.name}</h6>
                  </div>
                  <div className='category-desc'>
                    <p>{category.description}</p>
                  </div>
                  <Link className='link' to={category.link} />
                </div>
                <Corner color='secondary' />
              </div>
            ))}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default GemsPortal
