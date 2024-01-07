import './_dropdown.scss'
import { Corner } from '@components/ui'
import { Positions } from '@enums/index'
import classNames from 'classnames'
import { useState, ReactNode, MouseEvent, useEffect, useCallback, useRef } from 'react'

interface DropdownProps {
  opener: ReactNode
  children: ReactNode
  position?: Positions
  className?: string
}

const Dropdown = ({ opener, children, position = "right-bottom", className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleOutsideClick: EventListener = (e: Event) => handleClickOutside(e as unknown as MouseEvent)

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleClickOutside, isOpen])

  const classContent = classNames('dropdown-content', position)
  const classOpener = classNames('dropdown-opener', isOpen && 'active')

  return (
    <div ref={dropdownRef} className={classNames('dropdown', className)}>
      <div onClick={handleToggle} className={classOpener}>
        {opener}
      </div>
      {isOpen && (
        <div className={classContent} data-colors="tertiary">
          <div className="dropdown-content-scroll">
            {children}
          </div>
          <Corner />
        </div>
      )}
    </div>
  )
}

export default Dropdown
