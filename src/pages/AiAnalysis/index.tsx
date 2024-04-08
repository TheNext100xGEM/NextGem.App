import "./_AiAnalysis.scss"
import { Input, Button } from "@components/ui"
import { SITE_NAME } from "@constants/index"
import { Icon } from "@iconify/react/dist/iconify.js"
import Cookies from "js-cookie"
import { useState, ReactNode } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

import { postAnalysis } from "../../queries/api"

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

function AnalysisPage() {
  const [websiteUrl, setWebsiteUrl] = useState<string>("")
  const navigate = useNavigate()

  const handleAnalysis = async () => {
    if (websiteUrl === "") {
      toast.error("Enter a website link to proceed with the analysis")
      return
    }
    if (!Cookies.get("web3TokenAuth")) {
      toast.error("Wallet connection required to proceed.")
      return
    }
    const analyze = await postAnalysis({ websiteUrl })
    if (analyze.status && analyze.statusUrl) {
      const urlObj = new URL(analyze.statusUrl)
      const pathName = urlObj.pathname

      navigate(pathName, { replace: true })
    } else if (analyze.message === "Unauthorized") {
      toast.error("Beta Access required")
    } else {
      toast.error(analyze.message ?? "Unknown error - Try again later")
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${SITE_NAME} — Ai Analysis`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" data-rh="true" />
        <meta
          name='description'
          content='Analyze any crypto project with a website/dextools or coinmarketcap link.'
        />
        <meta
          name='og:description'
          content='Analyze any crypto project with a website/dextools or coinmarketcap link.'
        />
      </Helmet>
      <div className='analysis'>
        <div className='wrapper'>
          <Link to='/gems' className='analysis-back gem-link'>
            <Icon icon='material-symbols:arrow-back' />
            Back to gems
          </Link>
          <Section>
            <div className='AiAnalysis-heading'>
              <Icon icon='tabler:sparkles' className='AiAnalysis-icon' />{" "}
              Analyze a new project
            </div>
          </Section>
          <div className='AiAnalysis-main'>
            <div className='AiAnalysis-main-inner'>
              <div className='AiAnalysis-main-headings'>
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
              <div className='AiAnalysis-sub-headings'>
                DISCLAIMER:
                <br />
                The NextGEM Analysis Engine is still in beta. If for any reason
                your analysis seems off / innacurate please contact our
                development team on Telegram. Thanks.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnalysisPage
