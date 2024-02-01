import "./_gems.scss"
import GemCard from "@components/GemCard"
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
import CryptoBlockChains from "@data/cryptoBlockChains"
import CryptoMarketAreas from "@data/cryptoMarketArea"
import { useInfiniteQuery } from "@tanstack/react-query"
import classNames from "classnames"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { getGemCollection } from "../../../queries/api"
import { mapGem } from "@models/GemCard"
import React from "react"
import PanelGem from "@components/PanelGem"
import { useGemContext } from "@context/GemContext"

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
    id: '',
    label: "None"
  },
  {
  id: 'note',
  label: "AI Note"
}, {
    id: 'tokens',
    label: "Tokens"
  }
]
  const { sortBy, setSortBy } = useGemContext();

  const handleCheckboxChange = (label: string) => {
    setSortBy(label !== '' ? [label] : []);
  }

  return (
    <FilterDrop name='Sort by' right={sortBy.join(',')}>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Checkbox
              label={option.label}
              type='radio'
              name='sort'
              onChange={() => handleCheckboxChange(option.id)}
              checked={sortBy.length ? sortBy.includes(option.id) : option.id === ''}
            />
          </li>
        ))}
      </ul>
    </FilterDrop>
  )
}

const FilterByCategories = () => {
  const { categories, setCategories } = useGemContext()

  const handleCheckboxChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories((prevCategories) =>
        prevCategories?.filter(
          (prevCategory) => prevCategory !== category
        )
      )
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        category
      ])
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
  const { chains, setChains } = useGemContext()


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

const FilterAiNote = () => {
  const { noteMin, setNoteMin, noteMax, setNoteMax } = useGemContext()

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
  const { setSearchQuery } = useGemContext()

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

  return (
    <div className={classNames("filter", open && "open")}>
      <FilterSearchQuery />
      <div className='filter-actions'>
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
  const { noteMin, noteMax, categories, chains, searchQuery, sortBy } = useGemContext()

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
    queryFn: ({pageParam}) =>
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
    initialPageParam: 1
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
  }, [])

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Gems</title>
      </Helmet>

      <div className='gems'>
        <Filter />
        <Grid>
          {qGemCollection.data &&
            qGemCollection.data.map((page, i) => (
              <React.Fragment key={i}>
                {page.map((item, id) => (
                  <Item key={id}>
                    <GemCard {...item} />
                  </Item>
                ))}
              </React.Fragment>
            ))}
        </Grid>
        {qGemCollection.isFetching && (
          <div className='gems-loader'>
            <Loader />
          </div>
        )}
        {qGemCollection.isFetched && qGemCollection.data && qGemCollection.data[0].length === 0 && (
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
