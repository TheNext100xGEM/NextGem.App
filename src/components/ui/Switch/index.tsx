import "./_switch.scss"
import React, { ChangeEventHandler } from "react"

interface SwitchProps {
  isChecked: boolean
  onChange: ChangeEventHandler
}

export const Switch: React.FC<SwitchProps> = ({ isChecked, onChange }) => {
  return (
    <label className='switch'>
      <input type='checkbox' checked={isChecked} onChange={onChange} />
      <span className='slider'></span>
    </label>
  )
}
