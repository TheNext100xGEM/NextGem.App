import "./_note.scss"
import { Corner } from "@components/ui"
import { NOTE_MAX } from "@constants/index"
import { PropsNote } from "@models/Note"

export const NoteCard = ({ total }: PropsNote) => {
  let status
  if (total && total < 4) {
    status = "danger"
  } else if (total && total >= 4 && total < 6) {
    status = "warning"
  } else if (total && total >= 6) {
    status = "success"
  }

  return (
    <div className='note' data-status={status} data-colors='primary'>
      <span>Ai Note</span>
      <strong>
        {total ?? "?"} <small>/ {NOTE_MAX}</small>
      </strong>
      <Corner color='primary' />
    </div>
  )
}
