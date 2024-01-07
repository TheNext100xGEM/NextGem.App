import './_button.scss'
import { Corner, Loader } from '@components/ui'
import { SOUND_BUTTON_CLICK, SOUND_BUTTON_HOVER, VOLUME_BUTTON_CLICK, VOLUME_BUTTON_HOVER } from '@constants/index'
import { Status, Colors } from '@enums/index'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from 'use-sound'

export type PropsButton = {
  href?: string
  icon?: string
  sprite?: ReactNode
  children?: ReactNode
  title?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  status?: Status
  color?: Colors
  className?: string
  minus?: boolean
  pathSoundClick?: string
  pathSoundHover?: string
  blank?: boolean
  reverseCorner?: boolean
  loaded?: boolean
}

export function Button({ 
  href, 
  icon, 
  sprite, 
  onClick, 
  status, 
  children, 
  title,
  className, 
  minus, 
  color = 'primary', 
  pathSoundClick, 
  pathSoundHover, 
  blank,
  reverseCorner,
  loaded
}: PropsButton) {

  const [soundClick] = useSound(pathSoundClick || SOUND_BUTTON_CLICK, { volume: VOLUME_BUTTON_CLICK })
  const [soundHover] = useSound(pathSoundHover || SOUND_BUTTON_HOVER, { volume: VOLUME_BUTTON_HOVER })

  const Content = (
    <>
      {(!minus && children) && <span className="btn-txt">{children}</span>}
      {loaded ? (<Loader />) : (
        <>
          {icon && <Icon icon={icon} />}
          {sprite && sprite}
        </>
      )}
      <Corner reverse={reverseCorner} color={color} />
    </>
  )

  const commonProps = {
    onMouseEnter: soundHover,
    className: classNames('btn', className, { minus: minus, loaded: loaded }),
    title: title,
    'data-colors': color,
    'data-status': status,
  }

  if (onClick) {
    return (
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick(e)
          soundClick()
        }}
        {...commonProps}
      >
        {Content}
      </button>
    )
  }
  
  if (blank) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={soundClick}
        {...commonProps}
      >
        {Content}
      </a>
    )
  }
  
  if (!href) {
    return (
      <div onClick={soundClick} {...commonProps}>
        {Content}
      </div>
    )
  }

  return (
    <Link to={href} onClick={soundClick} {...commonProps}>
      {Content}
    </Link>
  )
}