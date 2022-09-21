import type { BackendFactory } from 'dnd-core';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import Editable from '../core/components/Editable';
import GlobalHotKeys from '../core/components/HotKey/GlobalHotKeys';
import { createEmptyState } from '../core/EditorStore';
import type { ProviderProps } from '../core/Provider';
import Provider from '../core/Provider';
import type { ValueWithLegacy } from '../core/types';
import EditorUI from '../ui/EditorUI';
import StickyWrapper from './StickyWrapper';

export type DndBackend = BackendFactory;
export type EditableEditorProps = {
  value?: ValueWithLegacy | null;

  lang?: string;
} & ProviderProps;

const EditableEditor: FC<PropsWithChildren<EditableEditorProps>> = ({
  value,
  lang,
  children,
  options,
  renderOptions,
  callbacks,
}) => {
  const theValue = value || createEmptyState();

  return (
    <Provider
      lang={lang}
      callbacks={callbacks}
      value={theValue}
      renderOptions={renderOptions}
      options={options}
    >
      {children}
      <StickyWrapper>
        {(stickyNess) => (
          <>
            <GlobalHotKeys focusRef={stickyNess.focusRef} />
            <Editable />
            <EditorUI stickyNess={stickyNess} />
          </>
        )}
      </StickyWrapper>
    </Provider>
  );
};

export default EditableEditor;
