import "./_gems.scss"
import GemCard from "@components/GemCard"
import GemList from "@components/GemList"
import PanelGem from "@components/PanelGem"
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Item,
  Loader,
  Range
} from "@components/ui"
import { Grid } from "@components/ui"
import { NOTE_MAX, NOTE_MIN, SITE_NAME } from "@constants/index"
import { useGemsContext } from "@context/GemsContext"
import CryptoBlockChains from "@data/cryptoBlockChains"
import CryptoMarketAreas from "@data/cryptoMarketArea"
import { mapGem } from "@models/GemCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import classNames from "classnames"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ReactNode, useEffect, useRef, useState } from "react"
import React from "react"
import { Helmet } from "react-helmet-async"

import { getGemCollection } from "../../../queries/api"


gsap.registerPlugin(ScrollTrigger)

type PropsFilterDrop = {
  name: string
  children?: ReactNode
  className?: string
  right?: string | number
}

const FilterDrop = ({ name, right, children, className }: PropsFilterDrop) => {
  return (
    <Dropdown
      className={className}
      opener={
        <Button color='tertiary'>
          {name} {right && <small>{right}</small>}
        </Button>
      }
    >
      {children}
    </Dropdown>
  )
}
const FilterBySort = () => {
  const options = [
    {
      id: "",
      label: "None"
    },
    {
      id: "note",
      label: "AI Note"
    },
    {
      id: "tokens",
      label: "Tokens"
    }
  ]
  const { sortBy, setSortBy } = useGemsContext()

  const handleCheckboxChange = (label: string) => {
    setSortBy(label !== "" ? [label] : [])
  }

  return (
    <FilterDrop name='Sort by' right={sortBy.join(",")}>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Checkbox
              label={option.label}
              type='radio'
              name='sort'
              onChange={() => handleCheckboxChange(option.id)}
              checked={
                sortBy.length ? sortBy.includes(option.id) : option.id === ""
              }
            />
          </li>
        ))}
      </ul>
    </FilterDrop>
  )
}

const FilterByCategories = () => {
  const { categories, setCategories } = useGemsContext()

  const handleCheckboxChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(
        (prevCategories) =>
          prevCategories?.filter((prevCategory) => prevCategory !== category)
      )
    } else {
      setCategories((prevCategories) => [...prevCategories, category])
    }
  }

  return (
    <FilterDrop
      name='Categories'
      right={CryptoMarketAreas.length}
      className='listing'
    >
      {CryptoMarketAreas.map((category, index) => (
        <ul key={index}>
          <li key={index} className='item'>
            <Checkbox
              label={category.name}
              name='categories[]'
              value={category.id}
              onChange={() => handleCheckboxChange(category.id.toString())}
              checked={categories?.includes(category.id.toString())}
            />
          </li>
        </ul>
      ))}
    </FilterDrop>
  )
}

const FilterByChains = () => {
  const { chains, setChains } = useGemsContext()

  const handleCheckboxChange = (chain: string) => {
    if (chains.includes(chain)) {
      setChains((prevChains) =>
        prevChains.filter((prevChain) => prevChain !== chain)
      )
    } else {
      setChains((prevChains) => [...prevChains, chain])
    }
  }

  return (
    <FilterDrop
      name='Chains'
      right={CryptoBlockChains.length}
      className='listing'
    >
      <ul>
        {CryptoBlockChains.map((chain, index) => (
          <li key={index} className='item'>
            <Checkbox
              label={chain.name}
              name='chains[]'
              value={chain.id}
              onChange={() => handleCheckboxChange(chain.id)}
              checked={chains.includes(chain.id)}
            />
          </li>
        ))}
      </ul>
    </FilterDrop>
  )
}

const FilterByLaunchStatus = () => {
  const { launchStatus, setLaunchStatus } = useGemsContext()

  const handleCheckboxChange = (status: number) => {
    if (launchStatus.includes(status)) {
      setLaunchStatus((prevLaunchStatus) =>
        prevLaunchStatus.filter((prevStatus) => prevStatus !== status)
      )
    } else {
      setLaunchStatus((prevLaunchStatus) => [...prevLaunchStatus, status])
    }
  }

  const options = [
    {
      name: "Not Launched",
      id: 0,
    },
    {
      name: "Launch in progress",
      id: 1,
    },
    {
      name: "Live project",
      id: 2,
    }
  ]

  return (
    <FilterDrop
      name='Launch Status'
      right={options.length}
      className='listing'
    >
      <ul>
        {options.map((status, index) => (
          <li key={index} className='item'>
            <Checkbox
              label={status.name}
              name='launchStatus[]'
              value={status.id}
              onChange={() => handleCheckboxChange(status.id)}
              checked={launchStatus.includes(status.id)}
            />
          </li>
        ))}
      </ul>
    </FilterDrop>
  )
}

const FilterAiNote = () => {
  const { noteMin, setNoteMin, noteMax, setNoteMax } = useGemsContext()

  return (
    <FilterDrop name='Ai Note' right={`${noteMin}-${noteMax}`}>
      <Range
        min={noteMin}
        max={noteMax}
        minBound={NOTE_MIN}
        maxBound={NOTE_MAX}
        onChange={({ min, max }) => {
          setNoteMin(min)
          setNoteMax(max)
        }}
      />
    </FilterDrop>
  )
}

const FilterSearchQuery = () => {
  const { setSearchQuery } = useGemsContext()

  return (
    <Input
      icon='carbon:search'
      type='search'
      placeholder='Research a project or token...'
      onChange={setSearchQuery}
    />
  )
}

const Filter = () => {
  const [open, setOpen] = useState(false)
  const { viewMode, setViewMode } = useGemsContext()

  return (
    <div className={classNames("filter", open && "open")}>
      <Button
        minus
        color='tertiary'
        icon={
          viewMode === "list"
            ? "clarity:view-cards-line"
            : "carbon:show-data-cards"
        }
        onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
      />
      <FilterSearchQuery />
      <div className='filter-actions'>
        <FilterByLaunchStatus />
        <FilterBySort />
        <FilterAiNote />
        <FilterByCategories />
        <FilterByChains />
        <Button
          className='save'
          icon='carbon:checkmark-outline'
          onClick={() => setOpen(false)}
          status='success'
        >
          Save filter
        </Button>
      </div>
      <Button
        className='filter-opener'
        minus
        icon='carbon:list-boxes'
        onClick={() => setOpen(true)}
        title='Filter'
      />
    </div>
  )
}

function GemsPage() {
  const {
    noteMin,
    noteMax,
    categories,
    chains,
    searchQuery,
    sortBy,
    viewMode
  } = useGemsContext()

  const qGemCollection = useInfiniteQuery({
    queryKey: [
      "gemCollection",
      noteMin,
      noteMax,
      categories,
      chains,
      searchQuery,
      sortBy
    ],
    queryFn: ({ pageParam }) =>
      getGemCollection({
        page: pageParam,
        noteMin,
        noteMax,
        categories,
        chains,
        searchQuery,
        sortBy
      }),
    select: (data) => {
      return data.pages.map((page) => page.docs.map(mapGem))
    },
    getPreviousPageParam: (lastPage) => lastPage.prevPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchOnWindowFocus: false
  })

  // useGSAP(
  //   () => {
  //     ScrollTrigger.batch(".gem", {
  //       onEnter: (batch) => {
  //         batch.forEach((card, index) =>
  //           gsap.to(card, {
  //             opacity: 1,
  //             y: 0,
  //             stagger: 0.25,
  //             delay: index * 0.1
  //           })
  //         )
  //       },
  //       once: true
  //     })
  //   },
  //   { dependencies: [qGemCollection.data] }
  // )

  const bottom = useRef(null)

  useEffect(() => {
    if (!bottom.current) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        qGemCollection.fetchNextPage()
      }
    })

    observer.observe(bottom.current)

    return () => observer.disconnect()
  }, [qGemCollection])

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Gems</title>
      </Helmet>

      <div className='gems'>
        <Filter />
        <div className='gem-list-wrapper'>
          {viewMode === "list" && (
            <table className='gem-list'>
              <thead>
                <tr>
                  <th className='gem-list-item-favorite'></th>
                  <th className='gem-list-item-name'>Name</th>
                  <th className='gem-list-item-note'>AI Note</th>
                  <th className='gem-list-item-link'>Link</th>
                  <th className='gem-list-item-status'>Status</th>
                  <th className='gem-list-item-cateogry'>Category</th>
                  <th className='gem-list-item-socials'>Socials</th>
                  <th className='gem-list-item-chains'>Chains</th>
                  <th className='gem-list-item-launchpad'>Launchpad</th>
                </tr>
              </thead>
              <tbody>
                {qGemCollection.data &&
                  qGemCollection.data.map((page, pageIndex) => (
                    <React.Fragment key={`gem-list-page-${pageIndex}`}>
                      {page.map((item, gemIndex) => (
                        <GemList {...item} key={`gem-${pageIndex}-${gemIndex}`} />
                      ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        {viewMode === "grid" && (
          <Grid>
            {qGemCollection.data &&
              qGemCollection.data.map((page, pageIndex) => (
                <React.Fragment key={`gem-grid-page-${pageIndex}`}>
                  {page.map((item, gemIndex) => (
                    <Item key={`gem-${pageIndex}-${gemIndex}`}>
                      <GemCard {...item} />
                    </Item>
                  ))}
                </React.Fragment>
              ))}
          </Grid>
        )}
        {qGemCollection.isFetching && (
          <div className='gems-loader'>
            <Loader />
          </div>
        )}
        {qGemCollection.isFetched &&
          qGemCollection.data &&
          qGemCollection.data[0].length === 0 && (
            <div className='gems-empty'>
              No gems available with current filters.
            </div>
          )}
        <div style={{ height: "1px" }} ref={bottom} />
      </div>

      <PanelGem />
    </>
  )
}

export default GemsPage
