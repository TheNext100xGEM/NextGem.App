import { useEffect, useState } from "react"
import Web3 from "web3"
import NextGemTokenABI from "@constants/ABI/NextGemToken.json"
import axios from "axios"
import { INFURA_URL, TOKEN_ADDRESS } from "../libs/constants"

interface TokenInfo {
  totalSupply: string | null
  holderCount: number | null
}

const useTokenInfo = (): TokenInfo => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    totalSupply: null,
    holderCount: null
  })

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const web3 = new Web3(
            INFURA_URL
        )
        const tokenContract = new web3.eth.Contract(
          NextGemTokenABI,
        TOKEN_ADDRESS
        )

        const totalSupply = (await tokenContract.methods
          .totalSupply()
          .call()) as string
        setTokenInfo((prevState) => ({ ...prevState, totalSupply }))

        const estimateHolderCount = async () => {
          const apiUrl = "https://api.etherscan.io/api"

          // ERC20 contract address
          

          // Etherscan API key
          const apiKey = "RSVR1JVWZUXY2F1GAM3VVFP3GAQJN9AE6Y"
          try {
            // Get token holder data from Etherscan API
            let totalTokenHolders = 0;
            let page = 1;
            let hasMoreResults = true;
    
            while (hasMoreResults) {
                // Get token holder data from Etherscan API
                const response = await axios.get(apiUrl, {
                    params: {
                        module: 'token',
                        action: 'tokenholderlist',
                        contractaddress: TOKEN_ADDRESS,
                        page,
                        offset: 10000, // Maximum number of token holders per page
                        sort: 'asc',
                        apikey: apiKey
                    }
                });
    
                // Extract total token holders from current page
                const tokenHolders = response.data.result;
                totalTokenHolders += tokenHolders.length;
    
                // Check if there are more results
                if (tokenHolders.length < 10000) {
                    hasMoreResults = false;
                } else {
                    // Increment page for next request
                    page++;
                }
            }
            return totalTokenHolders
        } catch (error) {
            console.error('Error fetching token holder count:', error);
            return 0
        }
        }

        const holderCount = await estimateHolderCount()
        setTokenInfo((prevState) => ({ ...prevState, holderCount }))
      } catch (error) {
        console.error("Error fetching token info:", error)
      }
    }

    fetchTokenInfo()
  }, [])

  return tokenInfo
}

export default useTokenInfo
