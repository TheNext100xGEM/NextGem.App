import './_corner.scss'
import { Status, Colors } from '@enums/index'
import classNames from 'classnames'

type PropsConers = {
  reverse?: boolean
  status?: Status
  color?: Colors
  className?: string
}

function Corner({ reverse, color = 'tertiary', status, className }: PropsConers) {
  return (
    <div 
      className={classNames('corner', reverse && 'reverse', className)}
      data-colors={color}
      data-status={status}
      >
      <span className="corner-left" />
      <span className="corner-right" />
      <span className="corner-top-bottom" />
    </div>
  )
}

export default Corner