import { useEffect, useState } from 'react';

import stakingContractJson from '@constants/ABI/NextGemStaking.json';
import tokenContractJson from '@constants/ABI/NextGemToken.json'
import Web3 from 'web3';

const httpProvider = 'https://mainnet.infura.io/v3/5982800e8b2940c689c2b7335f104c61';

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

export const useStakeContract = () => {
    return useContract(stakingContractJson as any, '0x4dcD2a5E68638E0b64766f59C15C02ca11411D98');
  };
  
  export const useTokenContract = () => {
    return useContract(tokenContractJson as any, '0xFBE44caE91d7Df8382208fCdc1fE80E40FBc7e9a');
  };

export default useContract;
