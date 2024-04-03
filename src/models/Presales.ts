export type Presales = Presale[]

export interface Presale {
  _id: string
  date: string
  raise_amount: number
  raise_amount_token: number
  raise_url: string
  name?: string
  pad_url?: string
  "name:"?: string
  main_url?: string
}