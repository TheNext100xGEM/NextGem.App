import './_page.scss'
import { ReactNode } from 'react'

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page">
      <div className="wrapper">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}