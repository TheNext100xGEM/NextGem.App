import { Status } from '@enums/Status'

export type PropsOffer = {
  duration: number
  durationLabel: string
  token: number
  price: number
  percent?: number
  status?: Status
}
