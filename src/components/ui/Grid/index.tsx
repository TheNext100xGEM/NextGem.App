import './_grid.scss'
import classNames from 'classnames'
import { ReactNode } from 'react'

type PropsGrid = {
  children?: ReactNode
  className?: string
}

export function Grid({ children, className }: PropsGrid) {
  return (
    <div className={classNames('grid', className)}>
      {children}
    </div>
  )
}

type PropsItem = {
  children?: ReactNode
  className?: string
}

export function Item({ children, className }: PropsItem) {
  return (
    <div className={classNames('grid-item', className)}>
      {children}
    </div>
  )
}