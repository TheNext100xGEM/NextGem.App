import './_alert.scss'
import { Corner } from '@components/ui'
import { Colors } from '@enums/Colors'
import { Status } from '@enums/Status'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { ReactNode } from 'react'

export type PropsAlert = {
  children: ReactNode
  status?: Status
  color?: Colors
  icon?: string
  className?: string
}

export function Alert({ children, status, color = 'primary', icon, className }: PropsAlert) {  
  return (
    <div className={classNames('alert', className)} data-status={status}>
      {icon && <Icon icon={icon} />}
      <div className="alert-content">
        {children}
      </div>
      <Corner color={color} />
    </div>
  )
}