import "./_input.scss"
import { Corner } from "@components/ui"
import { SOUND_BUTTON_CLICK, VOLUME_BUTTON_CLICK } from "@constants/index"
import {
  Colors,
  InputTypes,
  InputValues,
  Status,
  CheckboxTypes
} from "@enums/index"
import { Icon } from "@iconify/react"
import classNames from "classnames"
import { ReactNode, useId } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

type PropsDefault = {
  id?: string
  className?: string
  label?: string
  required?: boolean
  name?: string
  disabled?: boolean
  value?: InputValues
}

export type PropsInput = PropsDefault & {
  icon?: string
  sprite?: ReactNode
  type?: InputTypes
  placeholder?: string
  status?: Status
  colors?: Colors
  onChange?: (value: string) => void
}

export function Input({
  id,
  icon,
  sprite,
  className,
  type = "text",
  label,
  value,
  name,
  placeholder,
  required,
  disabled,
  colors = "tertiary",
  status,
  onChange
}: PropsInput) {
  const defaultId = useId()
  const inputId = id ? id : defaultId

  const commonProps = {
    id: inputId,
    name: name,
    type: type,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    spellCheck: false
  }

  return (
    <>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div
        className={classNames("input", className)}
        data-colors={colors}
        data-status={status}
      >
        {(icon || sprite) && (
          <div className='input-icon'>
            {icon && <Icon icon={icon} />}
            {sprite && sprite}
          </div>
        )}
        <input
          value={value}
          onChange={(evt) => onChange?.(evt.target.value)}
          {...commonProps}
        />
        <Corner />
      </div>
    </>
  )
}

export type PropsCheckbox = PropsDefault & {
  type?: CheckboxTypes
  checked?: boolean
  onChange?: () => void
  children?: ReactNode
}

export function Checkbox({
  id,
  label,
  name,
  type = "checkbox",
  required,
  className,
  value,
  disabled,
  checked,
  onChange,
  children
}: PropsCheckbox) {
  const defaultId = useId()
  const checkId = id ? id : defaultId

  const commonProps = {
    id: checkId,
    name: name,
    type: type,
    required: required,
    disabled: disabled,
    checked: checked
  }

  const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
    volume: VOLUME_BUTTON_CLICK
  })

  return (
    <div className={classNames("checkbox", className)}>
      <input
        value={value}
        onChange={onChange}
        onClick={soundClick}
        {...commonProps}
      />
      {(label || children) && (
        <label htmlFor={checkId} onClick={soundClick}>
          {label && label}
          {children && children}
        </label>
      )}
    </div>
  )
}
