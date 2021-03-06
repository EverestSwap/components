import { EVEREST_TOKENS_REPO_RAW_BASE_URL, LogoSize } from 'src/constants';

export const getTokenLogoURL = (address: string, size: LogoSize = 24) =>
  `${EVEREST_TOKENS_REPO_RAW_BASE_URL}/main/assets/${address}/logo_${size}.png`;
