import "./_gemDetail.scss"
import { useQuery } from "@tanstack/react-query"

import { mapGemFull } from "@models/GemFull"
import { useParams } from "react-router-dom"
import { NoteCard } from "@components/Note"
import { SITE_NAME } from "@constants/index"
import { Helmet } from "react-helmet-async"
import { getGemSingle } from "../../../queries/api"
import { ReactNode } from "react"
import classNames from "classnames"
import { Corner } from "@components/ui"

function GemDetailPage() {
  const {tokenId} = useParams();
  let token = '', id = '';

  if (tokenId) {
    const split = tokenId.split('-');
    token = split[0];
    id = split[1];
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

  return (
    <>
      <Helmet>
      <title>{`${SITE_NAME} — ${token}`}</title>

      </Helmet>
      <div className='gemDetail'>
        <div className='wrapper'>
          {qGemSingle.data && (
            <div className='gemDetail-content'>
              <h1 className='gemDetail-title'>{qGemSingle.data?.name ?? ""}</h1>
              <p className='gemDetail-desc'>{qGemSingle.data.description}</p>
              {qGemSingle.data.gemini_score && qGemSingle.data.gemini_raw && (
                <Card>
                  <div className='gemDetail-block'>
                    <div className='gemDetail-block-header'>
                      <h3>Gemini</h3>
                      <NoteCard
                        total={parseInt(qGemSingle.data.gemini_score)}
                      ></NoteCard>
                    </div>
                    <p>{qGemSingle.data.gemini_raw}</p>
                  </div>
                </Card>
              )}
              {qGemSingle.data.mistral_score && qGemSingle.data.mistral_raw && (
                <Card>
                  <div className='gemDetail-block'>
                    <div className='gemDetail-block-header'>
                      <h3>Mistral</h3>
                      <NoteCard
                        total={parseInt(qGemSingle.data.mistral_score)}
                      ></NoteCard>
                    </div>

                    <p>{qGemSingle.data.mistral_raw}</p>
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
                    <p>{qGemSingle.data.gpt_raw}</p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GemDetailPage
