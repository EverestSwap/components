import { CICZ, ChainId, Currency, Token } from '@everestswap/sdk';
import deepEqual from 'deep-equal';
import React, { useMemo } from 'react';
import { AvaxLogo } from 'src/components/Icons';
import { LogoSize } from 'src/constants';
import { getTokenLogoURL } from 'src/utils/getTokenLogoURL';
import { StyledLogo } from './styles';

export default function CurrencyLogo({
  currency,
  size = 24,
  style,
  imageSize = size,
}: {
  currency?: Currency;
  size?: LogoSize;
  style?: React.CSSProperties;
  imageSize?: LogoSize;
}) {
  const srcs: string[] = useMemo(() => {
    if (currency === CICZ[ChainId.ICE_MAINNET]) return [];
    if (currency instanceof Token || !!(currency as Token).address) {
      const primarySrc = getTokenLogoURL((currency as Token)?.address, imageSize);

      return [primarySrc];
    }

    return [];
  }, [currency]);

  if (deepEqual(currency, CICZ[ChainId.ICE_MAINNET])) {
    return <AvaxLogo size={`${size}px`} />;
  }

  return <StyledLogo size={`${size}px`} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
