import "./_panel.scss"
import { Modal } from "@components/ui"
import { useGemContext } from "@context/GemContext"
import { useQuery } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { getGemSingle } from "../../queries/api"
import { mapGem } from "@models/GemCard"
import { NoteCard } from "@components/Note"

function PanelGem() {
  const { id, setId } = useGemContext()
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    setId("")
  }

  useEffect(() => {
    if (id) {
      openModal()
    } else {
      closeModal()
    }
  }, [id])

  const qGemSingle = useQuery({
    queryKey: ["gemSingle", id],
    queryFn: () => getGemSingle({ id }),
    select: (data) => {
      return mapGem(data)
    },
    enabled: id !== ""
  })

  const PanelGemDetail = () => {
    return (
      <Modal
        title={qGemSingle.data?.name ?? ""}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {qGemSingle.data && (
          <div className='PanelGem'>
            <p className='PanelGem-desc'>{qGemSingle.data.description}</p>
            {/* {qGemSingle.data.gemini_score && qGemSingle.data.gemini_raw && (
              <div className='PanelGem-block'>
                <h3>Gemini</h3>
                <p>{qGemSingle.data.gemini_raw}</p>
                <NoteCard
                  total={parseInt(qGemSingle.data.gemini_score)}
                ></NoteCard>
              </div>
            )}
            {qGemSingle.data.mistral_score && qGemSingle.data.mistral_raw && (
              <div className='PanelGem-block'>
                <h3>Mistral</h3>
                <p>{qGemSingle.data.mistral_raw}</p>
                <NoteCard
                  total={parseInt(qGemSingle.data.mistral_score)}
                ></NoteCard>
              </div>
            )}
            {qGemSingle.data.gpt_score && qGemSingle.data.gpt_raw && (
              <div className='PanelGem-block'>
                <h3>GPT</h3>
                <p>{qGemSingle.data.gpt_raw}</p>
                <NoteCard
                  total={parseInt(qGemSingle.data.gpt_score)}
                ></NoteCard>
              </div>
            )} */}
          </div>
        )}
      </Modal>
    )
  }

  return (
    <>
      <PanelGemDetail />
    </>
  )
}

export default PanelGem
