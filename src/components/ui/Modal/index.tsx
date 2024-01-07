import './_modal.scss'
import { Button, Corner } from '@components/ui'
import { ReactNode } from 'react'
import Modal from 'react-modal'

type PropsModal = {
  children?: ReactNode
  isOpen: boolean
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void
  title?: string
}

function ModalNext({ children, isOpen, onRequestClose, title }: PropsModal) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
      >
        {(title || onRequestClose) &&
          <div className="modal-title">
            {title && <h5>{title}</h5>}
            {onRequestClose && <Button onClick={onRequestClose} minus icon="carbon:close-large" />}
          </div>
        }
        <div className="modal-content">
          {children}
        </div>
      <Corner />
    </Modal>
  )
}

export default ModalNext