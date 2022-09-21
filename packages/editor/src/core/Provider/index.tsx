import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import DndProvider from './DndProvider';
import BlurGate from '../components/BlurGate';
import type {
  Callbacks,
  Options,
  RenderOptions,
  ValueWithLegacy,
} from '../types';
import CallbacksProvider from './CallbacksProvider';
import EditorStoreProvider from './EditorStoreProvider';
import OptionsProvider from './OptionsProvider';
import RenderOptionsProvider from './RenderOptionsProvider';
import { ThemeProvider } from '@mui/material';

import { DEFAULT_OPTIONS } from '../defaultOptions';

export type ProviderProps = {
  lang?: string;
  value: ValueWithLegacy | null;
  options: Options;
  callbacks: Callbacks;
  renderOptions: RenderOptions;
};

const Provider: FC<PropsWithChildren<ProviderProps>> = ({
  lang = 'default',
  value,
  children = [],
  renderOptions,
  callbacks,
  options,
}) => {
  return (
    <OptionsProvider {...options}>
      <RenderOptionsProvider {...renderOptions}>
        <CallbacksProvider {...callbacks}>
          <DndProvider>
            <EditorStoreProvider lang={lang} value={value}>
              <ThemeProvider theme={options.uiTheme || DEFAULT_OPTIONS.uiTheme}>
                <BlurGate>{children}</BlurGate>
              </ThemeProvider>
            </EditorStoreProvider>
          </DndProvider>
        </CallbacksProvider>
      </RenderOptionsProvider>
    </OptionsProvider>
  );
};

export default Provider;
