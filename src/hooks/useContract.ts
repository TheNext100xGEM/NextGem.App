// import { useEffect, useState } from 'react';
// import {
//   getMCRTStakeAddress,
//   getPointsAddress,
// } from '../utils/addressHelpers';

// import stakingContractJson from '../constants/ABI/MCRTStake.json';
// import pointContractJson from '../constants/ABI/points.json';

// import { getWeb3NoAccount } from 'utils/web3';

// //web3
// import Web3 from 'web3';
// let web3 = window.ethereum ? new Web3(window.ethereum) : getWeb3NoAccount();

// const useContract = (abi, address, contractOptions = null) => {
//   // const web3 = useWeb3();
//   // let web3 = new Web3(window.ethereum);
//   const [contract, setContract] = useState(
//     new web3.eth.Contract(abi, address, contractOptions),
//   );

//   useEffect(() => {
//     setContract(new web3.eth.Contract(abi, address, contractOptions));
//   }, [abi, address, contractOptions, web3]);

//   return contract;
// };

// /**
//  * Helper hooks to get specific contracts (by ABI)
//  */

// export const useStakeContract = () => {
//   return useContract(stakingContractJson.abi, getMCRTStakeAddress());
// };

// export const usePointContract = () => {
//   return useContract(pointContractJson.abi, getPointsAddress());
// };


// export default useContract;
