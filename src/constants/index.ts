import { CHAINS, ChainId, JSBI, Percent, Token, WICZ } from '@everestswap/sdk';

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ICE_ARCTIC]: CHAINS[ChainId.ICE_ARCTIC].contracts!.router,
  [ChainId.ICE_MAINNET]: CHAINS[ChainId.ICE_MAINNET].contracts!.router,
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.ICE_MAINNET]: {},
};

export const NetworkContextName = 'NETWORK';

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 10 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = '600';

export const EVRS: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(
    ChainId.ICE_ARCTIC,
    CHAINS[ChainId.ICE_ARCTIC].contracts!.token,
    18,
    CHAINS[ChainId.ICE_ARCTIC].token_symbol!,
    'Everest',
  ),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    CHAINS[ChainId.ICE_MAINNET].contracts!.token,
    18,
    CHAINS[ChainId.ICE_MAINNET].token_symbol!,
    'Everest',
  ),
};

export const USDT: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'USDT', 'Tether USD'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xde3A24028580884448a5397872046a019649b084',
    6,
    'USDT',
    'Tether USD',
  ),
};

export const USDTe: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'USDT.e', 'Tether USD'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    6,
    'USDT.e',
    'Tether USD',
  ),
};

export const UST: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'UST', 'Wormhole UST'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xb599c3590F42f8F995ECfa0f85D2980B76862fc1',
    6,
    'UST',
    'Wormhole UST',
  ),
};

export const axlUST: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'axlUST', 'Axelar Wrapped UST'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0x260Bbf5698121EB85e7a74f2E45E16Ce762EbE11',
    6,
    'axlUST',
    'Axelar Wrapped UST',
  ),
};

export const USDC: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'USDC', 'USD Coin'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    6,
    'USDC',
    'USD Coin',
  ),
};

export const USDCe: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 6, 'USDC.e', 'USD Coin'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    6,
    'USDC.e',
    'USD Coin',
  ),
};

// these tokens can be directly linked to (via url params) in the swap page without prompting a warning
export const TRUSTED_TOKEN_ADDRESSES: { readonly [chainId in ChainId]: string[] } = {
  [ChainId.ICE_ARCTIC]: [],
  [ChainId.ICE_MAINNET]: [WICZ[ChainId.ICE_MAINNET].address, EVRS[ChainId.ICE_MAINNET].address],
};

export const SWAP_DEFAULT_CURRENCY = {
  [ChainId.ICE_MAINNET]: {
    inputCurrency: 'ICZ',
    outputCurrency: UST[ChainId.ICE_MAINNET].address,
  },
  [ChainId.ICE_ARCTIC]: {
    inputCurrency: '',
    outputCurrency: '',
  },
};

export const DAIe: { [chainId in ChainId]: Token } = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, ZERO_ADDRESS, 18, 'DAI.e', 'Dai Stablecoin'),
  [ChainId.ICE_MAINNET]: new Token(
    ChainId.ICE_MAINNET,
    '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    18,
    'DAI.e',
    'Dai Stablecoin',
  ),
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ICE_ARCTIC]: [WICZ[ChainId.ICE_ARCTIC], EVRS[ChainId.ICE_ARCTIC]],
  [ChainId.ICE_MAINNET]: [
    WICZ[ChainId.ICE_MAINNET],
    EVRS[ChainId.ICE_MAINNET],
    USDTe[ChainId.ICE_MAINNET],
    DAIe[ChainId.ICE_MAINNET],
    USDCe[ChainId.ICE_MAINNET],
    UST[ChainId.ICE_MAINNET],
    axlUST[ChainId.ICE_MAINNET],
    USDC[ChainId.ICE_MAINNET],
  ],
};

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 ETH

export const EVEREST_TOKENS_REPO_RAW_BASE_URL = `https://raw.githubusercontent.com/EverestSwap/tokenlist`;

export type LogoSize = 24 | 48;
