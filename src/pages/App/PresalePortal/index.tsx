import bgSrc from "@assets/img/home/bg-uniswap.png"
import ApeTerminalCard from "@assets/img/launchpads/apeterminal.jpg"
import ChainGptCard from "@assets/img/launchpads/chaingpt.jpg"
import FjordCard from "@assets/img/launchpads/fjord.jpg"
import SeedifyCard from "@assets/img/launchpads/seedify.jpg"
import { Button, Corner, Grid, Picture } from "@components/ui"
import StarAnimation from "@components/ui/StarAnimation"
import { SITE_NAME } from "@constants/index"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import React, { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import "./_presale.scss"

import { getPresales } from "../../../queries/api"
import { PresaleStatus } from "@models/Presales"

interface PresalePortalProps {}

export const PresalePortal: React.FC<PresalePortalProps> = () => {
  const Cards = useMemo(() => {
    return [ApeTerminalCard, FjordCard, SeedifyCard, ChainGptCard]
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount)
  }

  const { data: presales } = useQuery({
    queryKey: ["getPresales"],
    queryFn: () => getPresales()
  })

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Presale</title>
      </Helmet>
      <div className='presale'>
        <div className='section'>
          <StarAnimation />
          <h2>
            Join <strong>Pre-Sale</strong>
          </h2>
          <Grid>
            {presales?.map((presale, i) => (
              <div className='launchpad' key={presale._id}>
                <img className='banner' src={Cards[i]} loading='lazy' />

                <div className='heading'>
                  <h6>{presale.name ?? "_"}</h6>
                  <Status status={presale.status ?? 0} />
                </div>
                <table className='launch-infos'>
                  <tbody>
                    <tr>
                      <td>Launch Date</td>
                      <td>
                        {moment(presale.date).format("HH:mm, MMMM Do, YYYY")}
                      </td>
                    </tr>
                    <tr>
                      <td>Raise Amount</td>
                      <td>{formatCurrency(presale.raise_amount)}</td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  href={presale.raise_url}
                  blank
                  color='primary'
                  icon='ic:outline-arrow-outward'
                >
                  {presale.status === 1 ? "Join" : "View"}
                </Button>
                <Corner color='secondary' />
                <div className='corner-hover'>
                  <Corner color='secondary' />
                </div>
              </div>
            ))}
          </Grid>
        </div>
        <Picture
          src={bgSrc}
          width='1800'
          height='937'
          alt='Trade'
          classPicture='bck'
        />
      </div>
    </>
  )
}

const Status = ({ status }: { status: PresaleStatus }) => {
  switch (status) {
    case PresaleStatus.UPCOMING:
      return (
        <div className='status'>
          <span className='ping'>
            <span className='animate upcoming' />
            <span className='bg upcoming' />
          </span>
          <span>Upcoming</span>
        </div>
      )
    case PresaleStatus.LIVE:
      return (
        <div className='status'>
          <span className='ping'>
            <span className='animate live' />
            <span className='bg live' />
          </span>
          <span>Live</span>
        </div>
      )
    case PresaleStatus.ENDED:
      return (
        <div className='status'>
          <span className='ping'>
            <span className='bg ended' />
          </span>
          <span>Completed</span>
        </div>
      )
    default:
      return (
        <div className='status'>
          <span className='ping'>
            <span className='animate upcoming' />
            <span className='bg upcoming' />
          </span>
          <span>Upcoming</span>
        </div>
      )
  }
}
