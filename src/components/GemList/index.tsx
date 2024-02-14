import "./_gemList.scss"
import { NoteCard } from "@components/Note"
import { SocialList } from "@components/Socials"
import { Button } from "@components/ui"
import { Icon } from "@iconify/react"
import { Gem } from "@models/GemCard"
import { useMutation } from "@tanstack/react-query"
import { removeUrlPrefix } from "@utils/url"
import { Children, ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { deleteUserFavorite, postUserFavorite } from "../../queries/api"
import { cleanHTMLTags } from "@utils/string"

function GemList({
  id,
  name,
  description,
  category,
  href,
  chains,
  launchpad,
  weightedScore,
  status = Math.round(Math.random() * 3 - 1),
  socials,
  slug,
  isFavorite
}: Gem) {
  const urlTransform = removeUrlPrefix(href)

  type PropsList = {
    children: ReactNode[] | ReactNode
  }

  const List = ({ children }: PropsList): ReactNode => {
    const childrenArray = Children.toArray(children)
    const [visibleItems] = useState(1)
    const ulRef = useRef<HTMLUListElement>(null)

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

  const qPostUserFavorite = useMutation({
    mutationFn: postUserFavorite
  })
  const qDeleteUserFavorite = useMutation({
    mutationFn: deleteUserFavorite
  })

  const [saved, setSaved] = useState(isFavorite)
  const handleSave = async () => {
    if (saved) {
      await qDeleteUserFavorite.mutateAsync({ projectId: id })
    } else {
      await qPostUserFavorite.mutateAsync({ projectId: id })
    }

    setSaved(!saved)
    saved
      ? toast(`Gem "${name}" unsaved`)
      : toast.success(`Gem "${name}" saved`)
  }

  return (
    <tr
      className='gem-list-item'
      data-colors='tertiary'
      data-project-status={status}
    >
      <td className='gem-list-item-favorite'>
        <Button
          icon={saved ? "carbon:bookmark-filled" : "carbon:bookmark"}
          onClick={handleSave}
          color='tertiary'
          minus
          title='Save'
        />
      </td>
      <td className='gem-list-item-name'>
        <Link to={`/gems/${slug}`} className='gem-title'>
          {name}
        </Link>
        <div className='gem-list-item-name-desc'>
          <Icon icon='material-symbols-light:info-outline' />
          <div className='gem-list-item-name-desc-tooltip'>
            <p>{cleanHTMLTags(description)}</p>
          </div>
        </div>
      </td>
      <td className='gem-list-item-note'>
        <Link to={`/gems/${slug}`}>
          <NoteCard total={weightedScore ?? null} />
        </Link>
      </td>
      <td className='gem-list-item-link'>
        <a
          className='gem-link'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          {urlTransform} <Icon icon='carbon:link' />
        </a>
      </td>
      <td className='gem-list-item-status'>
        <div className='gem-status'>
          {status === -1 && (
            <>
              <span>Unavailable</span>
              <Icon icon='mdi:gauge-empty' />
            </>
          )}
          {status === 0 && (
            <>
              <span>Not launched</span>
              <Icon icon='material-symbols:settings-outline' />
            </>
          )}
          {status === 1 && (
            <>
              <span>Launch in progress</span>
              <Icon icon='material-symbols:rocket-launch-outline' />
            </>
          )}
          {status === 2 && (
            <>
              <span>Live project</span>
              <Icon icon='tabler:sparkles' />
            </>
          )}
        </div>
      </td>
      <td className='gem-list-item-category'>{category}</td>
      <td className='gem-list-item-socials'>
        <SocialList items={socials} />
      </td>
      <td className='gem-list-item-chains'>
        <List>{chains.map((item) => item)}</List>
      </td>
      <td className='gem-list-item-launchpad'>
        <List>{launchpad}</List>
      </td>
    </tr>
  )
}

export default GemList
