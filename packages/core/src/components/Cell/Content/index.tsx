import React, { useRef } from 'react';
import { I18nField } from '../../../types/editable';
import {
  useCell,
  useCellData,
  useEditableId,
  useFocusCell,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useLang,
  useRemoveCell,
  useScrollToViewEffect,
  useUpdateCellContent,
} from '../../hooks';
import scrollIntoViewWithOffset from '../utils/scrollIntoViewWithOffset';

export const getI18nState = ({
  stateI18n,
  state,
  lang,
}: {
  stateI18n: I18nField<unknown>;
  state: unknown;
  lang?: string;
}) => {
  if (!stateI18n || !lang) {
    return state;
  }
  return (
    stateI18n?.[lang] ??
    // find first non-empty
    stateI18n?.[Object.keys(stateI18n).find((l) => stateI18n[l])] ??
    state
  );
};

const Content: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const node = useCell(nodeId);
  //useWhyDidYouUpdate('content', node);

  const lang = useLang();
  const editableId = useEditableId();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const updateCellContent = useUpdateCellContent(node.id);
  const cellData = useCellData(node);

  const focus = useFocusCell(node.id);
  const focused = useIsFocused(node.id);

  const ref = useRef<HTMLDivElement>();
  useScrollToViewEffect(
    nodeId,
    () => {
      scrollIntoViewWithOffset(ref.current, 100);
    },
    [ref.current]
  );

  const { Component } = node.content.plugin;
  const remove = useRemoveCell(node.id);

  return (
    <div
      onMouseDown={
        !isPreviewMode ? () => focus(false, 'onMouseDown') : undefined
      }
      tabIndex={-1}
      style={{ outline: 'none' }}
      ref={ref}
      className="ory-cell-inner ory-cell-leaf"
    >
      <Component
        editable={editableId}
        cell={node}
        nodeId={nodeId}
        lang={lang}
        state={cellData}
        pluginConfig={node.content.plugin}
        focused={Boolean(isEditMode && focused)}
        readOnly={!isEditMode}
        isEditMode={isEditMode}
        isPreviewMode={isPreviewMode}
        onChange={updateCellContent}
        remove={remove}
      />
    </div>
  );
};

export default React.memo(Content);
