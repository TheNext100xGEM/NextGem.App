import "./_gemDetail.scss"
import { useQuery } from "@tanstack/react-query"

import { mapGemFull } from "@models/GemFull"
import { Link, useParams } from "react-router-dom"
import { NoteCard } from "@components/Note"
import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"
import { getGemSingle } from "../../../queries/api"
import { Children, ReactNode, useRef, useState } from "react"
import classNames from "classnames"
import { Button, Corner } from "@components/ui"
import Markdown from "@components/ui/Markdown"
import { removeUrlPrefix } from "@utils/url"
import { Icon } from "@iconify/react/dist/iconify.js"
import { SocialList } from "@components/Socials"

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

  const handleAnalysis = () => {}

  return (
    <>
      <Helmet>
        <title>{`${SITE_NAME} — ${qGemSingle.data?.name ?? token}`}</title>
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
                  <div className='gemDetail-header-socials'>
                    <Card>
                      <table>
                        <tbody>
                          <Row title='Socials'>
                            <SocialList items={qGemSingle.data.socials} />
                          </Row>
                          <Row title='Chains'>
                            <List>
                              {qGemSingle.data.chains.map((item) => item)}
                            </List>
                          </Row>
                          <Row title='Launchpad'>
                            <List>{qGemSingle.data.launchpad}</List>
                          </Row>
                        </tbody>
                      </table>
                    </Card>
                  </div>
                  <div className='gemDetail-header-content'>
                    <div className='gem-sub'>{qGemSingle.data.category}</div>
                    <h1 className='gem-title'>{qGemSingle.data.name ?? ""}</h1>
                    <a
                      className='gem-link'
                      href={qGemSingle.data.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {removeUrlPrefix(qGemSingle.data.href)}{" "}
                      <Icon icon='carbon:link' />
                    </a>
                  </div>

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
                </div>
              </Section>
              <div className='gemDetail-content'>
                <div className='gemDetail-desc'>
                  <Markdown>{qGemSingle.data.description}</Markdown>
                </div>
                {qGemSingle.data.gemini_score && qGemSingle.data.gemini_raw && (
                  <Card>
                    <div className='gemDetail-block'>
                      <div className='gemDetail-block-header'>
                        <h3>Gemini</h3>
                        <NoteCard
                          total={parseInt(qGemSingle.data.gemini_score)}
                        ></NoteCard>
                      </div>
                      <div className='gemDetail-block-content'>
                        <Markdown>{qGemSingle.data.gemini_raw}</Markdown>
                      </div>
                    </div>
                  </Card>
                )}
                {qGemSingle.data.mistral_score &&
                  qGemSingle.data.mistral_raw && (
                    <Card>
                      <div className='gemDetail-block'>
                        <div className='gemDetail-block-header'>
                          <h3>Mistral</h3>
                          <NoteCard
                            total={parseInt(qGemSingle.data.mistral_score)}
                          ></NoteCard>
                        </div>
                        <div className='gemDetail-block-content'>
                          <Markdown>{qGemSingle.data.mistral_raw}</Markdown>
                        </div>
                      </div>
                    </Card>
                  )}
                {qGemSingle.data.gpt_score && qGemSingle.data.gpt_raw && (
                  <Card>
                    <div className='gemDetail-block'>
                      <div className='gemDetail-block-header'>
                        <h3>GPT</h3>
                        <NoteCard
                          total={parseInt(qGemSingle.data.gpt_score)}
                        ></NoteCard>
                      </div>
                      <div className='gemDetail-block-content'>
                        <Markdown>{qGemSingle.data.gpt_raw}</Markdown>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GemDetailPage
