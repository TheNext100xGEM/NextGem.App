import "./_note.scss"
import { Corner } from "@components/ui"
import { NOTE_MAX } from "@constants/index"
import { PropsNote } from "@models/Note"

export const NoteCard = ({ total }: PropsNote) => {
  let status
  if (total && total > 0 && total < NOTE_MAX / 4) {
    status = "danger"
  } else if (total && total >= NOTE_MAX / 4 && NOTE_MAX / 2 >= total) {
    status = "warning"
  } else if (total && total > NOTE_MAX / 2) {
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
