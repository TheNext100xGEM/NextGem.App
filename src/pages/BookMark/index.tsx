import { Helmet } from "react-helmet-async"
import AccountSidebar from "@components/Sidebar"
import "./_bookmark.scss"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@components/ui"
import { Icon } from "@iconify/react"
import { cleanHTMLTags } from "@utils/string"
import { removeUrlPrefix } from "@utils/url"
import { SocialList } from "@components/Socials"
import { useState } from "react"
import toast from "react-hot-toast"
import { getUserFavorite } from "../../queries/api"
import { NoteCard } from "@components/Note"

// Consolidating GemList directly inside the BookmarksPage component

function BookmarksPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserFavorite"],
    queryFn: getUserFavorite
  })

  // Error handling
  if (error) {
    return (
      <div className='error-message'>
        <p>Failed to load bookmarked gems. Please try again later.</p>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className='loading-message'>
        <p>Loading your bookmarked gems...</p>
      </div>
    )
  }

  // GemList Component inside the same file
  const GemList = ({
    name,
    description,
    category,
    href,
    chains,
    launchpad,
    weightedScore,
    status = -1,
    socials,
    slug,
    isFavorite
  }: any) => {
    const urlTransform = removeUrlPrefix(href)
    const [saved, setSaved] = useState(isFavorite)

    const handleSave = async () => {
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
          <a href={`/gems/${slug}`} className='gem-title'>
            {name}
          </a>
          <div className='gem-list-item-name-desc'>
            <Icon icon='material-symbols-light:info-outline' />
            <div className='gem-list-item-name-desc-tooltip'>
              <p>{cleanHTMLTags(description)}</p>
            </div>
          </div>
        </td>
        <td className='gem-list-item-note'>
          <a href={`/gems/${slug}`}>
            <NoteCard total={weightedScore ?? null} />
          </a>
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
          <SocialList
            items={Object.entries(socials || {}).map(([platform, url]) => ({
              id: platform, // Use the platform name (e.g., 'telegram', 'twitter') as the unique id
              href: url || "", // Ensure href is always a string (empty string if the url is null/undefined)
              platform // The platform name itself
            }))}
          />
        </td>
        <td className='gem-list-item-chains'>
          <ul>
            {chains.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </td>
        <td className='gem-list-item-launchpad'>
          <ul>
            {launchpad.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </td>
      </tr>
    )
  }

  return (
    <div className='bookmarks-page'>
      <Helmet>
        <title>Bookmark | NextGem AI</title>
      </Helmet>
      <AccountSidebar />
      <main className='bookmarks-content'>
        <h1>Bookmarked Gems</h1>
        <div className='gems-list custom-scrollbar'>
          {/* Displaying the list of gems */}
          <table className='gem-list'>
            <thead>
              <tr>
                <th className='gem-list-item-favorite'></th>
                <th className='gem-list-item-name'>Name</th>
                <th className='gem-list-item-note'>AI Note</th>
                <th className='gem-list-item-link'>Link</th>
                <th className='gem-list-item-status'>Status</th>
                <th className='gem-list-item-category'>Category</th>
                <th className='gem-list-item-socials'>Socials</th>
                <th className='gem-list-item-chains'>Chains</th>
                <th className='gem-list-item-launchpad'>Launchpad</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping over the gem data */}
              {(data as any)?.data?.map((gem: any) => (
                <GemList
                  key={gem.id} // Unique key per gem
                  id={gem.id}
                  slug={gem.slug}
                  tokenName={gem.tokenName}
                  name={gem.name}
                  description={gem.description}
                  category={gem.category}
                  href={gem.href}
                  chains={gem.chains || []} // Ensure chains is an array
                  launchpad={gem.llmList || []} // Ensure llmList is an array
                  weightedScore={gem.weightedScore}
                  status={gem.isMemecoin ? 1 : 2} // Adjust status based on `isMemecoin` or other business rules
                  socials={gem.socials || { telegram: null, twitter: null }} // Ensure socials have default values
                  isFavorite={false} // Placeholder, adjust based on user data if needed
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default BookmarksPage
