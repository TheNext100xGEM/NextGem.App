import { Web3ReactProvider } from "@web3-react/core"
import { Connector } from "@web3-react/types"
import { ReactNode, useEffect } from "react"

import {
  ConnectionType,
  PRIORITIZED_CONNECTORS,
  getConnection
} from "../libs/connections"

// Function to handle the connection with a specific connector
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

// Connect eagerly to available connectors
const connectEagerly = async () => {
  const connectorsToTry = [
    ConnectionType.INJECTED,
    ConnectionType.WALLET_CONNECT,
    ConnectionType.COINBASE_WALLET,
    ConnectionType.NETWORK // Add any other connectors as needed
  ]

  for (const connectionType of connectorsToTry) {
    const connector = getConnection(connectionType).connector
    await connect(connector)
  }
}

// Web3 context provider component
export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Attempt to connect eagerly on component mount
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
