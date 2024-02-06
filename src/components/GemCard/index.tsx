import "./_gemCard.scss"
import { NoteCard } from "@components/Note"
import { SocialList } from "@components/Socials"
import { Button, Corner, Menu } from "@components/ui"
import { Icon } from "@iconify/react"
import { Gem } from "@models/GemCard"
import { cleanHTMLTags } from "@utils/string"
import { removeUrlPrefix } from "@utils/url"
import { Children, ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"
import { NavLink } from "react-router-dom"

const MenuGemCard = ({ name, token, id }: { name: string; token: string; id: string }) => {

  const [saved, setSaved] = useState(false)
  const handleSave = () => {
    setSaved(!saved)
    saved
      ? toast(`Token "${name}" unsaved`)
      : toast.success(`Token "${name}" saved`)
  }

  const menuItems = [
    <Button
      icon={saved ? "carbon:bookmark-filled" : "carbon:bookmark"}
      onClick={handleSave}
      color='tertiary'
      minus
      title='Save'
    />
  ]

  const subMenuItems = [
    <Button href='/gem-ai' icon='carbon:text-mining-applier' color='tertiary'>
      Ask Gem AI
    </Button>,
    <NavLink to={`/gems/${token}-${id}`}>
      <Button icon='carbon:search' color='tertiary'>
        See details
      </Button>
    </NavLink>,
    <Button icon='carbon:share' color='tertiary'>
      Share
    </Button>,
    <Button icon='carbon:debug' color='tertiary'>
      Reported
    </Button>
  ]

  return <Menu items={menuItems} sub={subMenuItems} />
}

function GemCard({
  id,
  name,
  category,
  href,
  description,
  chains,
  launchpad,
  llmList,
  weightedScore,
  status,
  socials,
  token
}: Gem) {
  const urlTransform = removeUrlPrefix(href)

  type PropsSection = {
    children: ReactNode[] | ReactNode
  }

  const Section = ({ children }: PropsSection): ReactNode => {
    return (
      <div className='gem-section'>
        {children}
        <div className='gem-section-light' />
      </div>
    )
  }

  type PropsRow = {
    title: string
    children: ReactNode[] | ReactNode
  }

  const Row = ({ title, children }: PropsRow): ReactNode => {
    return (
      <tr className='gem-sub'>
        <td>{title}</td>
        <td>{children}</td>
      </tr>
    )
  }

  type PropsList = {
    children: ReactNode[] | ReactNode
  }

  const List = ({ children }: PropsList): ReactNode => {
    const childrenArray = Children.toArray(children)
    const [visibleItems] = useState(1)
    const ulRef = useRef<HTMLUListElement>(null)

    // useEffect(() => {
    //   const handleResize = () => {
    //     console.log("handleResize")
    //     if (ulRef.current) {
    //       const itemsPerRow = Math.floor(ulRef.current.offsetWidth / 100)
    //       setVisibleItems(itemsPerRow)
    //     }
    //   }
    //   window.addEventListener("resize", handleResize)
    //   handleResize()
    //   return () => window.removeEventListener("resize", handleResize)
    // }, [])

    const renderListWithOverflow = () => {
      const visibleItemsList = childrenArray.slice(0, visibleItems)
      const hiddenItems = childrenArray.slice(visibleItems)
      const hiddenItemsCount = hiddenItems.length

      return (
        <>
          {visibleItemsList.map((item, id) => (
            <li key={id}>{item}</li>
          ))}
          {hiddenItemsCount > 0 && (
            <li className='hidded'>+{hiddenItemsCount}</li>
          )}
        </>
      )
    }

    return <ul ref={ulRef}>{renderListWithOverflow()}</ul>
  }

  return (
    <div className='gem' data-colors='tertiary' data-project-status={status}>
      <Section>
        <div className='gem-heading'>
          <div className='gem-sub'>{category}</div>
          <MenuGemCard name={name} id={id} token={token} />
        </div>
        <div className='gem-title'>{name}</div>
        <a
          className='gem-link'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          {urlTransform} <Icon icon='carbon:link' />
        </a>
        <div className='gem-desc'>
          <p>{cleanHTMLTags(description)}</p>
        </div>
      </Section>
      <Section>
        <table>
          <tbody>
            <Row title='Socials'>
              <SocialList items={socials} />
            </Row>
            <Row title='Chains'>
              <List>{chains.map((item) => item)}</List>
            </Row>
            <Row title='Launchpad'>
              <List>{launchpad}</List>
            </Row>
            <Row title='Analyser'>
              <List>{llmList.map((item) => item)}</List>
            </Row>
          </tbody>
        </table>
      </Section>
      <div className='gem-bottom'>
        <NoteCard total={weightedScore ?? null} />
      </div>
      <Corner />
    </div>
  )
}

export default GemCard
