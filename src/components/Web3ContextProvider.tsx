import { Web3ReactProvider, useWeb3React } from "@web3-react/core"
import { ReactNode, useEffect } from "react"

import {
  ConnectionType,
  PRIORITIZED_CONNECTORS,
  getConnection
} from "../libs/connections"
import { Connector } from "@web3-react/types"

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }


  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

const connectEagerly = async () => {
  await connect(getConnection(ConnectionType.INJECTED).connector)
  // await connect(getConnection(ConnectionType.NETWORK).connector)
  // await connect(getConnection(ConnectionType.COINBASE_WALLET).connector)
  // await connect(getConnection(ConnectionType.WALLET_CONNECT).connector)
}

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    connectEagerly()
  }, [])

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [
        connector.connector,
        connector.hooks
      ])}
    >
      {children}
    </Web3ReactProvider>
  )
}
