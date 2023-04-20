import React from 'react';
import { useOption, useUiTranslator } from '../../core/components/hooks';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import UndoRedo from './UndoRedo';
import Zoom from './Zoom';

const getStickyNessstyle = (stickyness?: StickyNess): React.CSSProperties => {
  if (
    !stickyness ||
    (!stickyness.shouldStickToBottom && !stickyness.shouldStickToTop)
  ) {
    return {
      position: 'fixed',
      right: stickyness?.rightOffsetFixed || 0,
    };
  }

  return {
    position: 'absolute',
    bottom: stickyness.shouldStickToBottom ? 0 : 'auto',
    top: stickyness.shouldStickToTop ? 0 : 'auto',
    right: -stickyness.rightOffset || 0,
  };
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export type StickyNess = {
  shouldStickToTop: boolean;
  shouldStickToBottom: boolean;
  rightOffset: number;
  rightOffsetFixed: number;
  stickyElRef?: React.Ref<HTMLDivElement>;
};
export const Sidebar: React.FC<{
  stickyNess?: StickyNess;
}> = ({ stickyNess }) => {
  const { t } = useUiTranslator();
  const zoomEnabled = useOption('zoomEnabled');
  const undoRedoEnabled = useOption('undoRedoEnabled');
  const editEnabled = useOption('editEnabled');
  const insertEnabled = useOption('insertEnabled');
  const layoutEnabled = useOption('layoutEnabled');
  const resizeEnabled = useOption('resizeEnabled');
  const previewEnabled = useOption('previewEnabled');
  const defaultLabels = {
    edit: 'Edit blocks',
    insert: 'Add blocks',
    layout: 'Move blocks',
    resize: 'Resize blocks',
    preview: 'Preview page',
  };

  const customOptions = useOption('customOptions');

  const actions = [
    // eslint-disable-next-line react/jsx-key
    undoRedoEnabled
      ? { action: <UndoRedo labelRedo="redo" labelUndo="undo" /> }
      : null,
    zoomEnabled
      ? { action: <Zoom labelZoomIn="zoom in" labelZoomOut="zoom out" /> }
      : null,
    editEnabled
      ? { action: <ToggleEdit label={t(defaultLabels.edit) ?? ''} /> }
      : null,
    insertEnabled
      ? { action: <ToggleInsert label={t(defaultLabels.insert) ?? ''} /> }
      : null,
    layoutEnabled
      ? { action: <ToggleLayout label={t(defaultLabels.layout) ?? ''} /> }
      : null,
    resizeEnabled
      ? { action: <ToggleResize label={t(defaultLabels.resize) ?? ''} /> }
      : null,
    previewEnabled
      ? { action: <TogglePreview label={t(defaultLabels.preview) ?? ''} /> }
      : null,
    ...(customOptions?.map((CustomOption) => ({ action: <CustomOption /> })) ?? []),
  ].filter(notEmpty);
  return (
    <div
      className="react-page-controls-mode-toggle-control-group"
      style={{
        position: 'fixed',
        zIndex: 10001,
        bottom: 0,
        right: 0,
        display: 'flex',
        maxHeight: '100%',
        ...getStickyNessstyle(stickyNess),
      }}
    >
      <div
        ref={stickyNess?.stickyElRef}
        style={{
          padding: 16,
          position: 'relative',

          flexFlow: 'column wrap',
          direction: 'rtl',

          display: 'flex',
        }}
      >
        {actions.map(({ action }, index) => (
          <div
            key={index}
            className="react-page-controls-mode-toggle-control"
            style={{
              animationDelay: (actions.length - index) * 150 + 'ms',
            }}
          >
            <>
              {action}
              <div className="react-page-controls-mode-toggle-clearfix" />
            </>
          </div>
        ))}
      </div>
    </div>
  );
};
