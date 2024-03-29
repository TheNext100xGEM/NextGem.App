import { Chain, CurrentConfig } from "../utils/chains"

// Chains
const MAINNET_CHAIN_ID = 1
const POLYGON_CHAIN_ID = 137

export const INPUT_CHAIN_ID =
  CurrentConfig.chain === Chain.POLYGON ? POLYGON_CHAIN_ID : MAINNET_CHAIN_ID
export const INPUT_CHAIN_URL =
  CurrentConfig.chain === Chain.POLYGON
    ? CurrentConfig.rpc.polygon
    : CurrentConfig.rpc.mainnet

export const CHAIN_TO_URL_MAP = {
  [MAINNET_CHAIN_ID]: CurrentConfig.rpc.mainnet,
  [POLYGON_CHAIN_ID]: CurrentConfig.rpc.polygon
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [MAINNET_CHAIN_ID]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.mainnet
  },
  [POLYGON_CHAIN_ID]: {
    explorer: "https://polygonscan.com/",
    label: "Polygon",
    nativeCurrency: { name: "Polygon Matic", symbol: "MATIC", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.polygon
  }
}

// URLs
export const METAMASK_URL = "https://metamask.io/"
export const APP_API_URL = import.meta.env.VITE_APP_API_URL
export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL
export const WALLET_CONNECT_PROJECT_ID = import.meta.env
  .WALLET_CONNECT_PROJECT_ID
