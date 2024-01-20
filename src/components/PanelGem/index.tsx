import "./_panel.scss"
import { Modal } from "@components/ui"
import { useGemContext } from "@context/GemContext"
import { useQuery } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { getGemSingle } from "../../queries/api"
import { mapGem } from "@models/GemCard"

function PanelGem() {
  const { tokenSymbol } = useGemContext()
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if (tokenSymbol) {
      openModal()
    } else {
      closeModal()
    }
  }, [tokenSymbol])

  const qGemSingle = useQuery({
    queryKey: ["gemSingle", tokenSymbol],
    queryFn: () => getGemSingle({ tokenSymbol }),
    select: (data) => {
      return mapGem(data)
    },
    enabled: tokenSymbol !== ""
  })

  const PanelGemDetail = () => {
    return (
      <Modal
        title={qGemSingle.data?.name ?? ""}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {tokenSymbol}
        {JSON.stringify(qGemSingle.data)}
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
