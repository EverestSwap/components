import { ChainId, contractAddresses } from '@everestswap/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.ICE_ARCTIC]: contractAddresses.ICE_ARCTIC.MULTICALL,
  [ChainId.ICE_MAINNET]: contractAddresses.ICE_MAINNET.MULTICALL,
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
