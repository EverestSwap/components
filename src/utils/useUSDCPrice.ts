// TODO: Actually calculate price
import { ChainId, Currency, JSBI, Price, WICZ, currencyEquals } from '@everestswap/sdk';
import { useMemo } from 'react';
import { USDCe } from 'src/constants';
import { PairState, usePairs } from '../data/Reserves';
import { useChainId } from '../hooks';
import { wrappedCurrency } from './wrappedCurrency';

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const chainId = useChainId();
  const wrapped = wrappedCurrency(currency, chainId);
  const USDC = USDCe[chainId];
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WICZ[chainId], wrapped) ? undefined : currency,
        chainId ? WICZ[chainId] : undefined,
      ],
      [wrapped?.equals(USDC) ? undefined : wrapped, chainId === ChainId.ICE_MAINNET ? USDC : undefined],
      [chainId ? WICZ[chainId] : undefined, chainId === ChainId.ICE_MAINNET ? USDC : undefined],
    ],
    [chainId, currency, wrapped, USDC],
  );
  const [[iczPairState, iczPair], [usdcPairState, usdcPair], [usdciczPairState, usdciczPair]] = usePairs(tokenPairs);

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined;
    }
    // handle wicz/icz
    if (wrapped.equals(WICZ[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WICZ[chainId]);
        return new Price(currency, USDC, price.denominator, price.numerator);
      } else {
        return undefined;
      }
    }
    // handle usdc
    if (wrapped.equals(USDC)) {
      return new Price(USDC, USDC, '1', '1');
    }

    const iczPairICZAmount = iczPair?.reserveOf(WICZ[chainId]);
    const iczPairICZUSDCValue: JSBI =
      iczPairICZAmount && usdciczPair
        ? usdciczPair.priceOf(WICZ[chainId]).quote(iczPairICZAmount, chainId).raw
        : JSBI.BigInt(0);

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC).greaterThan(iczPairICZUSDCValue)) {
      const price = usdcPair.priceOf(wrapped);
      return new Price(currency, USDC, price.denominator, price.numerator);
    }
    if (iczPairState === PairState.EXISTS && iczPair && usdciczPairState === PairState.EXISTS && usdciczPair) {
      if (usdciczPair.reserveOf(USDC).greaterThan('0') && iczPair.reserveOf(WICZ[chainId]).greaterThan('0')) {
        const avaxUsdcPrice = usdciczPair.priceOf(USDC);
        const currencyAvaxPrice = iczPair.priceOf(WICZ[chainId]);
        const usdcPrice = avaxUsdcPrice.multiply(currencyAvaxPrice).invert();
        return new Price(currency, USDC, usdcPrice.denominator, usdcPrice.numerator);
      }
    }
    return undefined;
  }, [chainId, currency, iczPair, iczPairState, usdciczPair, usdciczPairState, usdcPair, usdcPairState, wrapped, USDC]);
}
