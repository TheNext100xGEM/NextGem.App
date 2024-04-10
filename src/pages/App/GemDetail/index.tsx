import "./_gemDetail.scss"
import { NoteCard } from "@components/Note"
import ProgressBar from "@components/ProgressBar"
import { SocialList } from "@components/Socials"
import { Alert, Button, Corner } from "@components/ui"
import Markdown from "@components/ui/Markdown"
import { Icon } from "@iconify/react/dist/iconify.js"
import { mapGemFull } from "@models/GemFull"
import { useMutation, useQuery } from "@tanstack/react-query"
import { removeUrlPrefix } from "@utils/url"
import classNames from "classnames"
import { Children, ReactNode, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import { Link, useParams, useSearchParams } from "react-router-dom"

import {
  deleteUserFavorite,
  getGemSingle,
  postUserFavorite,
  postReloadAnalysis
} from "../../../queries/api"

function GemDetailPage() {
  const { tokenId } = useParams()
  let token = ""
  let id = ""

  if (tokenId) {
    const lastDashIndex = tokenId.lastIndexOf("-")
    token = tokenId.substring(0, lastDashIndex)
    id = tokenId.substring(lastDashIndex + 1)
  }

  const [isToggled, setIsToggled] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const qGemSingle = useQuery({
    queryKey: ["gemSingle", id, isToggled],
    queryFn: () => getGemSingle({ id: id!, isFundamentalAnalysis: !isToggled }),
    select: mapGemFull,
    enabled: !!id,
    refetchInterval: (data) =>
      data.state.data?.analyzeProgress?.analyzeState !== "analyzed" &&
      !data.state.data?.errorProcessing
        ? 10000
        : false,
    refetchIntervalInBackground: true
  })

  const qPostUserFavorite = useMutation({
    mutationFn: postUserFavorite
  })
  const qDeleteUserFavorite = useMutation({
    mutationFn: deleteUserFavorite
  })

  const [saved, setSaved] = useState(qGemSingle.data?.isFavorite ?? false)
  const handleSave = async () => {
    if (saved) {
      await qDeleteUserFavorite.mutateAsync({ projectId: id })
    } else {
      await qPostUserFavorite.mutateAsync({ projectId: id })
    }

    setSaved(!saved)
    saved
      ? toast(`Gem "${qGemSingle.data?.name ?? token}" unsaved`)
      : toast.success(`Gem "${qGemSingle.data?.name ?? token}" saved`)
  }

  type PropsCard = {
    children: ReactNode
    className?: string
    reverse?: boolean
  }

  const Card = ({ children, className, reverse = false }: PropsCard) => {
    return (
      <div className={classNames("card", className)}>
        {children}
        <Corner reverse={reverse} />
      </div>
    )
  }

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

  type PropsRow = {
    title: string
    children: ReactNode[] | ReactNode
  }

  const Row = ({ title, children }: PropsRow): ReactNode => {
    return (
      <tr className='gem-sub'>
        <td>{title}</td>
        <td>{children}</td>
      </tr>
    )
  }

  type PropsList = {
    children: ReactNode[] | ReactNode
  }

  const List = ({ children }: PropsList): ReactNode => {
    const childrenArray = Children.toArray(children)
    const [visibleItems] = useState(1)
    const ulRef = useRef<HTMLUListElement>(null)

    const renderListWithOverflow = () => {
      const visibleItemsList = childrenArray.slice(0, visibleItems)
      const hiddenItems = childrenArray.slice(visibleItems)
      const hiddenItemsCount = hiddenItems.length

      return (
        <>
          {visibleItemsList.map((item, id) => (
            <li key={id}>{item}</li>
          ))}
          {hiddenItemsCount > 0 && (
            <li className='hidded'>+{hiddenItemsCount}</li>
          )}
        </>
      )
    }

    return <ul ref={ulRef}>{renderListWithOverflow()}</ul>
  }

  const handleAnalysis = async () => {
    try {
      const reloadResponse = await postReloadAnalysis({ projectId: id })

      if (reloadResponse.status) {
        toast.success(reloadResponse.message ?? "Analysis reloaded")
      } else {
        toast.error(
          reloadResponse.message ??
            "Failed to reload analysis. Please try again later."
        )
      }
    } catch (error) {
      toast.error("Failed to reload analysis. Please try again later.")
    }
  }

  const chains =
    typeof qGemSingle.data?.chains === "object" ? qGemSingle.data?.chains : []
  const isBeingAnalyzed =
    qGemSingle.data?.analyzeProgress?.analyzeState !== "analyzed"

  const pageTitle = `${qGemSingle.data?.name} AI Analysis — The Next Gem`
  const pageDesc = qGemSingle.data?.description

  useEffect(() => {
    if (!qGemSingle.data) return
    const analysis = searchParams.get("analysis")

    if (!qGemSingle.data?.isMemecoin && analysis === "meme") {
      setSearchParams({ analysis: "fundamental" }, { replace: true })
    } else if (qGemSingle.data?.isMemecoin && analysis === "meme") {
      setIsToggled(true)
    } else {
      setIsToggled(false)
    }
  }, [
    searchParams,
    qGemSingle.data?.isMemecoin,
    qGemSingle.data,
    setSearchParams
  ])

  const handleToggle = () => {
    if (!qGemSingle.data) return
    if (!qGemSingle.data.isMemecoin) return

    const newToggleState = !isToggled
    setIsToggled(newToggleState)

    const newAnalysisValue = newToggleState ? "meme" : "fundamental"
    setSearchParams({ analysis: newAnalysisValue })
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        {/* Standard metadata tags */}
        <title>{pageTitle}</title>
        <meta name='title' content={pageTitle} />
        <meta name='description' content={pageDesc} />
        {/* Facebook tags */}
        <meta property='og:type' content={"website"} />
        {/* <meta property='og:image' content='/thumbnail.png' /> */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDesc} />
        {/* Twitter tags */}
        <meta name='twitter:card' content={"summary_large_image"} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDesc} />
        {/* <meta property='twitter:image' content={`/thumbnail.png`} /> */}
      </Helmet>
      <div className='gemDetail'>
        <div className='wrapper'>
          <Link to='/gems' className='gemDetail-back gem-link'>
            <Icon icon='material-symbols:arrow-back' />
            Back to gems
          </Link>
          {qGemSingle.data && !qGemSingle.data?.errorProcessing ? (
            <div className='gem'>
              <Section>
                <div className='gemDetail-header'>
                  {!isBeingAnalyzed ? (
                    <div className='gemDetail-header-socials'>
                      <Card>
                        <table>
                          <tbody>
                            <Row title='Socials'>
                              <SocialList items={qGemSingle.data.socials} />
                            </Row>
                            <Row title='Chains'>
                              <List>{chains.map((item) => item)}</List>
                            </Row>
                            <Row title='Launchpad'>
                              <List>{qGemSingle.data.launchpad}</List>
                            </Row>
                          </tbody>
                        </table>
                      </Card>
                    </div>
                  ) : null}
                  {!isBeingAnalyzed ? (
                    <div className='gemDetail-header-content'>
                      <div className='gem-sub'>{qGemSingle.data.category}</div>
                      <h1 className='gem-title'>
                        {qGemSingle.data.name ?? "Analyzing..."}
                      </h1>
                      <div className='gem-infos'>
                        <a
                          className='gem-link'
                          href={qGemSingle.data.href}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {removeUrlPrefix(qGemSingle.data.href)}{" "}
                          <Icon icon='carbon:link' />
                        </a>
                        <Button
                          icon={
                            saved ? "carbon:bookmark-filled" : "carbon:bookmark"
                          }
                          onClick={handleSave}
                          color='tertiary'
                          minus
                          title='Save'
                        />
                      </div>
                    </div>
                  ) : null}
                  {!isBeingAnalyzed ? (
                    <div className='gemDetail-header-note'>
                      <NoteCard total={qGemSingle.data.note.total} />
                      <Button
                        icon={"bx:analyse"}
                        onClick={handleAnalysis}
                        color='tertiary'
                      >
                        Reload analysis
                      </Button>
                      {qGemSingle.data.isMemecoin ? (
                        <Button onClick={handleToggle} color='tertiary'>
                          {isToggled
                            ? "Switch to Fundamental Analysis"
                            : "Switch to Meme Analysis"}
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </Section>
              {!isBeingAnalyzed ? (
                <div className='gemDetail-content'>
                  {isToggled ? (
                    <Alert status='info'>
                      Disclaimer: You are currently viewing this project through
                      the eyes of a degen (this uses Meme Analysis). To view
                      fundamentals, click on "Switch to Fundamental Analysis"
                    </Alert>
                  ) : null}
                  <div className='gemDetail-desc'>
                    {isToggled ? (
                      <Markdown>{qGemSingle.data.meme_description}</Markdown>
                    ) : (
                      <Markdown>{qGemSingle.data.description}</Markdown>
                    )}
                  </div>
                  {parseInt(qGemSingle.data.gpt_score ?? "0") > 0 &&
                  qGemSingle.data.gpt_raw ? (
                    <Card>
                      <div className='gemDetail-block'>
                        <div className='gemDetail-block-header'>
                          <h2>GPT</h2>
                          <NoteCard
                            total={
                              isToggled && qGemSingle.data.meme_gpt_score
                                ? parseInt(
                                    qGemSingle.data.meme_gpt_score ?? "0"
                                  )
                                : parseInt(qGemSingle.data.gpt_score ?? "0")
                            }
                          ></NoteCard>
                        </div>
                        <div className='gemDetail-block-content'>
                          {isToggled && qGemSingle.data.meme_gpt_raw ? (
                            <Markdown>{qGemSingle.data.meme_gpt_raw}</Markdown>
                          ) : (
                            <Markdown>{qGemSingle.data.gpt_raw}</Markdown>
                          )}
                        </div>
                      </div>
                    </Card>
                  ) : null}
                  {parseInt(qGemSingle.data.mistral_score ?? "0") > 0 &&
                  qGemSingle.data.mistral_raw ? (
                    <Card>
                      <div className='gemDetail-block'>
                        <div className='gemDetail-block-header'>
                          <h2>Mistral</h2>
                          <NoteCard
                            total={
                              isToggled && qGemSingle.data.meme_mistral_score
                                ? parseInt(
                                    qGemSingle.data.meme_mistral_score ?? "0"
                                  )
                                : parseInt(qGemSingle.data.mistral_score ?? "0")
                            }
                          ></NoteCard>
                        </div>
                        <div className='gemDetail-block-content'>
                          {isToggled && qGemSingle.data.meme_mistral_raw ? (
                            <Markdown>
                              {qGemSingle.data.meme_mistral_raw}
                            </Markdown>
                          ) : (
                            <Markdown>{qGemSingle.data.mistral_raw}</Markdown>
                          )}
                        </div>
                      </div>
                    </Card>
                  ) : null}
                  {parseInt(qGemSingle.data.gemini_score ?? "0") > 0 &&
                  qGemSingle.data.gemini_raw ? (
                    <Card>
                      <div className='gemDetail-block'>
                        <div className='gemDetail-block-header'>
                          <h2>Gemini</h2>
                          <NoteCard
                            total={
                              isToggled && qGemSingle.data.meme_gemini_score
                                ? parseInt(
                                    qGemSingle.data.meme_gemini_score ?? "0"
                                  )
                                : parseInt(qGemSingle.data.gemini_score ?? "0")
                            }
                          ></NoteCard>
                        </div>
                        <div className='gemDetail-block-content'>
                          {isToggled && qGemSingle.data.meme_gemini_raw ? (
                            <Markdown>
                              {qGemSingle.data.meme_gemini_raw}
                            </Markdown>
                          ) : (
                            <Markdown>{qGemSingle.data.gemini_raw}</Markdown>
                          )}
                        </div>
                      </div>
                    </Card>
                  ) : null}
                </div>
              ) : (
                <div className='gemDetail-content'>
                  <div className='gemDetail-block'>
                    <div className='gemDetail-analysis-upper'>
                      <div className='gemDetail-block-content gemDetail-analysis-container'>
                        <div className='gemDetail-queue-details'>
                          <div className='gemDetail-queue-position'>
                            Waiting for analysis.. Position in queue:{" "}
                            {qGemSingle.data?.analyzeProgress?.positionInQueue}/
                            {qGemSingle.data?.analyzeProgress?.totalInQueue}{" "}
                          </div>
                          <div className='gemDetail-eta'>
                            Estimated time:{" "}
                            {qGemSingle.data?.analyzeProgress?.eta} minutes
                          </div>
                        </div>

                        <div className='gemDetail-queue-progress'>
                          <ProgressBar
                            total={qGemSingle.data?.analyzeProgress?.progress}
                            hasMagic
                          />
                        </div>

                        <div className='gemDetail-queue-faq'>
                          <div className='gemDetail-queue-explainer'>
                            The NextGEM AI engine processes hundreds of projects
                            per day from degens, like yourself, all round the
                            world. This requires us tu queue everyones requests.
                          </div>
                          <div className='gemDetail-queue-explainer-footer'>
                            The higher your active tier, the higher priority
                            your requests will have in the queue.{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          {qGemSingle.data && qGemSingle.data?.errorProcessing ? (
            <div className='AnalysisError'>
              <div className='AnalysisError-heading'>
                We couldn't analyze this project
              </div>
              <div className='AnalysisError-sub'>
                If you believe this is an error, please contact our development
                team on Telegram
              </div>
              {qGemSingle.data ? (
                <div className='AnalysisError-sub'>
                  Website: {qGemSingle.data.href}
                  <br />
                  Project ID: {qGemSingle.data.id}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default GemDetailPage
