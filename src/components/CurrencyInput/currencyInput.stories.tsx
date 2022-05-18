import { CHAINS, ChainId, Token } from '@everestswap/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import { CurrencyInput } from '.';

export default {
  component: CurrencyInput,
  title: 'Everest/CurrencyInputs',
};

const TemplateCurrencyInput: ComponentStory<typeof CurrencyInput> = (args: any) => <CurrencyInput {...args} />;

export const Default = TemplateCurrencyInput.bind({});
Default.args = {
  label: 'To',
  currency: new Token(
    ChainId.ICE_MAINNET,
    CHAINS[ChainId.ICE_MAINNET].contracts!.token,
    18,
    CHAINS[ChainId.ICE_MAINNET].token_symbol!,
    'Everest',
  ),
};
