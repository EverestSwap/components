import { CICZ, ChainId, Currency, Token, WICZ } from '@everestswap/sdk';
import { NativeCurrency as UniCurrency, Token as UniToken } from '@uniswap/sdk-core';

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === CICZ[chainId] ? WICZ[chainId] : currency instanceof Token ? currency : undefined;
}

function convertToEverestToken(token: UniToken): Token {
  return new Token(token.chainId, token.address, token.decimals, token?.symbol, token?.name);
}

export function wrappedGelatoCurrency(
  currency: UniCurrency | UniToken,
  chainId: ChainId | undefined,
): Token | undefined {
  return chainId && !currency?.isToken ? WICZ[chainId] : currency.isToken ? convertToEverestToken(currency) : undefined;
}
