import "./_AiAnalysis.scss"


import { Link } from "react-router-dom"

import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"
import { useState, ReactNode } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
    Input,
    Button
} from "@components/ui"


type PropsSection = {
    children: ReactNode[] | ReactNode
  }

const Section = ({ children }: PropsSection): ReactNode => {
    return (
      <div className='gem-section'>
        {children}
        <div className='gem-section-light' />
      </div>
    )
  }

function analysisPage() {

  const [websiteUrl, setWebsiteUrl] = useState<string>("")

  const handleAnalysis = () => {
    console.log(websiteUrl)
  }

  return (
    <>
        <Helmet>
            <title>{`${SITE_NAME} — Ai Analysis`}</title>
            <meta name='description' content='Analyze any crypto project with a website/dextools or coinmarketcap link.' />
            <meta name='og:description' content='Analyze any crypto project with a website/dextools or coinmarketcap link.' />
        </Helmet>
        <div className='analysis'>
            <div className='wrapper'>
                <Link to='/gems' className='analysis-back gem-link'>
                    <Icon icon='material-symbols:arrow-back' />
                    Back to gems
                </Link>
                <Section>
                    <div className='AiAnalysis-heading'>
                        <Icon icon='tabler:sparkles' className="AiAnalysis-icon"/> Analyze a new project
                    </div>
                </Section>
                <div 
                    className="AiAnalysis-main"
                    >
                    <div className="AiAnalysis-main-inner">
                        <div className="AiAnalysis-main-headings">
                            Get NextGEM AI's feedback on any crypto project
                        </div>
                        <Input
                            icon='carbon:link'
                            type='text'
                            value={websiteUrl}
                            placeholder='Project website, Dextools Link or Coinmarketcap link'
                            onChange={setWebsiteUrl}
                        />
                        <Button
                            icon={"tabler:sparkles"}
                            onClick={handleAnalysis}
                            color='tertiary'
                            >
                            Analyze
                        </Button>
                        <div className="AiAnalysis-sub-headings">
                            DISCLAIMER:<br />
                            The NextGEM Analysis Engine is still in beta. If for any reason your analysis
                            seems off / innacurate please contact our development team on Telegram.
                            Thanks.
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    </>
  )
}

export default analysisPage
