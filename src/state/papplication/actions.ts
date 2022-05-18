import { createAction } from '@reduxjs/toolkit';
import { TokenList } from '@uniswap/token-lists';

export type PopupContent =
  | {
      txn: {
        hash: string;
        success: boolean;
        summary?: string;
      };
    }
  | {
      listUpdate: {
        listUrl: string;
        oldList: TokenList;
        newList: TokenList;
        auto: boolean;
      };
    };

export enum ApplicationModal {
  WALLET,
}

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>(
  'papplication/updateBlockNumber',
);
export const setOpenModal = createAction<ApplicationModal | null>('papplication/setOpenModal');

export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'papplication/addPopup',
);

export const removePopup = createAction<{ key: string }>('papplication/removePopup');
