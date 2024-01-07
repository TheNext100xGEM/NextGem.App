import './_menu.scss'
import { Button, Dropdown } from '@components/ui'
import { Positions } from '@enums/index'
import { ReactNode } from 'react'

type PropsMenu = {
  items?: ReactNode[]
  sub?: ReactNode[]
  position?: Positions
}

function Menu({ items, sub, position = "right-bottom" }: PropsMenu) {
  return (
    <nav className="menu">
      <ul className="menu-nav">
        {items && items.map((item, index) => (
          <li key={index} className="menu-nav-item">
            {item}
          </li>
        ))}
        {sub && 
          <li className="menu-nav-item">
            <Dropdown 
              position={position} 
              opener={
                <Button icon="carbon:overflow-menu-horizontal" minus={true} color="tertiary" />
              }>
              <ul className="menu-subnav">
                {sub.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </Dropdown>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Menu
