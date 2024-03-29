import "./_gemDetail.scss"
import { NoteCard } from "@components/Note"
import ProgressBar from "@components/ProgressBar"
import { SocialList } from "@components/Socials"
import { Button, Corner } from "@components/ui"
import Markdown from "@components/ui/Markdown"
import { SITE_NAME } from "@constants/index"
import { Icon } from "@iconify/react/dist/iconify.js"
import { mapGemFull } from "@models/GemFull"
import { useMutation, useQuery } from "@tanstack/react-query"
import { removeUrlPrefix } from "@utils/url"
import classNames from "classnames"
import { Children, ReactNode, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"

import {
  deleteUserFavorite,
  getGemSingle,
  postUserFavorite,
  postReloadAnalysis
} from "../../../queries/api"

function GemDetailPage() {
  const { tokenId } = useParams()
  let token = "",
    id = ""
  
  

  if (tokenId) {
    const lastDashIndex = tokenId.lastIndexOf("-")
    token = tokenId.substring(0, lastDashIndex)
    id = tokenId.substring(lastDashIndex + 1)
  }

  const qGemSingle = useQuery({
    queryKey: ["gemSingle", id],
    queryFn: () => getGemSingle({ id: id! }),
    select: mapGemFull,
    enabled: !!id
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
    try{
        const reloadResponse = await postReloadAnalysis({ projectId: id })
        
        if(reloadResponse.status) {
            toast.success(reloadResponse.message ?? 'Analysis reloaded')
        }else{
            toast.error(reloadResponse.message ?? 'Failed to reload analysis. Please try again later.')
        }
    }catch(error){
        toast.error('Failed to reload analysis. Please try again later.')
    }
  }

  //
  const chains = typeof qGemSingle.data?.chains === 'object' ? qGemSingle.data?.chains : []
  const isBeingAnalyzed = qGemSingle.data?.analyzeProgress?.analyzeState !== 'analyzed'

  return (
    <>
      <Helmet>
        <title>{`${SITE_NAME} — ${qGemSingle.data?.name ?? token}`}</title>
        <meta name='description' content={qGemSingle.data?.description} />
        <meta name='og:description' content={qGemSingle.data?.description} />
      </Helmet>
      <div className='gemDetail'>
        <div className='wrapper'>
          <Link to='/gems' className='gemDetail-back gem-link'>
            <Icon icon='material-symbols:arrow-back' />
            Back to gems
          </Link>
          {qGemSingle.data && (
            <div className='gem'>
              <Section>
                <div className='gemDetail-header'>
                {
                    !isBeingAnalyzed ? 
                        (<div className='gemDetail-header-socials'>
                            <Card>
                            <table>
                                <tbody>
                                <Row title='Socials'>
                                    <SocialList items={qGemSingle.data.socials} />
                                </Row>
                                <Row title='Chains'>
                                    <List>
                                    {chains.map((item) => item)}
                                    </List>
                                </Row>
                                <Row title='Launchpad'>
                                    <List>{qGemSingle.data.launchpad}</List>
                                </Row>
                                </tbody>
                            </table>
                            </Card>
                        </div>)
                        :
                        <div>&nbsp;</div>
                }
                  <div className='gemDetail-header-content'>
                    <div className='gem-sub'>{qGemSingle.data.category}</div>
                    <h1 className='gem-title'>{qGemSingle.data.name ?? ""}</h1>
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
                   {
                    !isBeingAnalyzed ? 
                        (
                        <div className='gemDetail-header-note'>
                            <NoteCard total={qGemSingle.data.note.total} />
                            <Button
                            icon={"bx:analyse"}
                            onClick={handleAnalysis}
                            color='tertiary'
                            >
                            Reload analysis
                            </Button>
                        </div>
                        )
                    : <div>&nbsp;</div>
                    }
                </div>
              </Section>
                {!isBeingAnalyzed ? (
                    <div className='gemDetail-content'>
                        <div className='gemDetail-desc'>
                            <Markdown>
                                {qGemSingle.data.description}
                            </Markdown>
                        </div>

                        {(parseInt(qGemSingle.data.gemini_score ?? '0') > 0) && qGemSingle.data.gemini_raw && (
                        <Card>
                            <div className='gemDetail-block'>
                            <div className='gemDetail-block-header'>
                                <h2>Gemini</h2>
                                <NoteCard
                                total={parseInt(qGemSingle.data.gemini_score ?? '0')}
                                ></NoteCard>
                            </div>
                            <div className='gemDetail-block-content'>
                                <Markdown>{qGemSingle.data.gemini_raw}</Markdown>
                            </div>
                            </div>
                        </Card>
                        )}
                        {(parseInt(qGemSingle.data.mistral_score ?? '0') > 0) &&
                        qGemSingle.data.mistral_raw && (
                            <Card>
                            <div className='gemDetail-block'>
                                <div className='gemDetail-block-header'>
                                <h2>Mistral</h2>
                                <NoteCard
                                    total={parseInt(qGemSingle.data.mistral_score ?? '0')}
                                ></NoteCard>
                                </div>
                                <div className='gemDetail-block-content'>
                                <Markdown>{qGemSingle.data.mistral_raw}</Markdown>
                                </div>
                            </div>
                            </Card>
                        )}
                        {(parseInt(qGemSingle.data.gpt_score ?? '0') > 0) && qGemSingle.data.gpt_raw && (
                        <Card>
                            <div className='gemDetail-block'>
                            <div className='gemDetail-block-header'>
                                <h2>GPT</h2>
                                <NoteCard
                                total={parseInt(qGemSingle.data.gpt_score ?? '0')}
                                ></NoteCard>
                            </div>
                            <div className='gemDetail-block-content'>
                                <Markdown>{qGemSingle.data.gpt_raw}</Markdown>
                            </div>
                            </div>
                        </Card>
                        )}
                    </div>
                ) : (
                    <div className='gemDetail-content'>
                        

                        <div className='gemDetail-block'>

                            <div className="gemDetail-analysis-upper">
                                <div className='gemDetail-block-content gemDetail-analysis-container'>


                                    <div className="gemDetail-queue-details">
                                        <div className="gemDetail-queue-position">Waiting for analysis.. Position in queue: {qGemSingle.data?.analyzeProgress?.positionInQueue}/{qGemSingle.data?.analyzeProgress?.totalInQueue} </div>
                                        <div className="gemDetail-eta">Estimated time: {qGemSingle.data?.analyzeProgress?.eta} minutes</div>
                                    </div>

                                    <div className="gemDetail-queue-progress">
                                        <ProgressBar
                                            total={qGemSingle.data?.analyzeProgress?.progress}
                                            hasMagic
                                        />
                                    </div>
                                    
                                    <div className="gemDetail-queue-faq">
                                        <div className="gemDetail-queue-explainer">
                                            The NextGEM AI engine processes hundreds of projects per day from degens, like yourself, all round the world. This requires us tu queue everyones requests.  
                                        </div>
                                        <div className="gemDetail-queue-explainer-footer">
                                            The higher your active tier, the higher priority your requests will have in the queue.                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                )}
            </div>
          ) }
        </div>
      </div>
    </>
  )
}

export default GemDetailPage
