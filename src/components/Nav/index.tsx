import './_nav.scss'
import { PropsNav } from '@models/Nav'

function Nav({ items }: PropsNav) {
  return (
    <nav className="nav">
      <ul>
        {items && items.map((item, id) => (
          <li key={id}>
            {item.component}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav