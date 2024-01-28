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
  const options: string[] = ["AI Note", "Favorites", "Tokens", "Categories"]
  const [selectedLabel, setSelectedLabel] = useState(options[0])

  const handleCheckboxChange = (label: string) => setSelectedLabel(label)

  return (
    <FilterDrop name='Sort by' right={selectedLabel}>
      <ul>
        {options.map((label, index) => (
          <li key={index}>
            <Checkbox
              label={label}
              type='radio'
              name='sort'
              onChange={() => handleCheckboxChange(label)}
              checked={selectedLabel === label}
            />
          </li>
        ))}
      </ul>
    </FilterDrop>
  )
}

const FilterByCategories = () => {
  const { setCategories } = useGemContext()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter(
          (prevCategory) => prevCategory !== category
        )
      )
    } else {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        category
      ])
    }
  }

  useEffect(() => {
    setCategories(selectedCategories.length ? selectedCategories : undefined)
  }, [selectedCategories])

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
              onChange={() => handleCheckboxChange(category.id)}
            />
          </li>
        </ul>
      ))}
    </FilterDrop>
  )
}

const FilterByChains = () => {
  const { setChains } = useGemContext()

  const [selectedChains, setSelectedChains] = useState<string[]>([])

  const handleCheckboxChange = (chain: string) => {
    if (selectedChains.includes(chain)) {
      setSelectedChains((prevSelectedChains) =>
        prevSelectedChains.filter((prevChain) => prevChain !== chain)
      )
    } else {
      setSelectedChains((prevSelectedChains) => [...prevSelectedChains, chain])
    }
  }

  useEffect(() => {
    setChains(selectedChains.length ? selectedChains : undefined)
  }, [selectedChains])
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
        min={NOTE_MIN}
        max={NOTE_MAX}
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
  const { noteMin, noteMax, categories, chains, searchQuery } = useGemContext()

  const qGemCollection = useInfiniteQuery({
    queryKey: [
      "gemCollection",
      noteMin,
      noteMax,
      categories,
      chains,
      searchQuery
    ],
    queryFn: () =>
      getGemCollection({
        noteMin,
        noteMax,
        categories,
        chains,
        searchQuery
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
        <div style={{ height: "1px" }} ref={bottom} />
      </div>

      <PanelGem />
    </>
  )
}

export default GemsPage
