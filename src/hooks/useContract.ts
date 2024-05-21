import { useEffect, useState } from 'react';

import premiumContractJson from '@constants/ABI/NextGemSubscription.json';
import stakingContractJson from '@constants/ABI/NextGemStaking.json'
import tokenContractJson from '@constants/ABI/NextGemToken.json'
import Web3 from 'web3';
import { INFURA_URL, PREMIUM_ADDRESS, STAKING_ADDRESS, TOKEN_ADDRESS } from '../libs/constants';

const httpProvider = INFURA_URL;

const web3NoAccount = new Web3(httpProvider);
let web3 = window.ethereum ? new Web3(window.ethereum) : web3NoAccount;

const useContract = (abi: any, address: string) => {
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address),
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address));
  }, [abi, address, web3]);

  return contract;
};

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const usePremiumContract = () => {
    return useContract(premiumContractJson as any, PREMIUM_ADDRESS);
  };

  export const useStakeContract = () => {
    return useContract(stakingContractJson as any, STAKING_ADDRESS);
  };
  
  export const useTokenContract = () => {
    return useContract(tokenContractJson as any, TOKEN_ADDRESS);
  };

export default useContract;
