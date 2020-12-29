import React from 'react';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import UndoRedo from './UndoRedo';

const defaultTranslations = {
  edit: 'Edit things',
  insert: 'Add things',
  layout: 'Move things',
  resize: 'Resize things',
  preview: 'Preview result',
};

const getStickyNessstyle = (stickyness?: StickyNess): React.CSSProperties => {
  if (
    !stickyness ||
    (!stickyness.shouldStickToBottom && !stickyness.shouldStickToTop)
  ) {
    return {
      position: 'fixed',
    };
  }

  return {
    position: 'absolute',
    bottom: stickyness.shouldStickToBottom ? 0 : 'auto',
    top: stickyness.shouldStickToTop ? 0 : 'auto',
    right: -stickyness.rightOffset || 0,
  };
};

export type StickyNess = {
  shouldStickToTop: boolean;
  shouldStickToBottom: boolean;
  rightOffset: number;
  stickyElRef?: React.Ref<HTMLDivElement>;
};
const Inner: React.SFC<{
  translations?: typeof defaultTranslations;
  stickyNess?: StickyNess;
}> = ({ stickyNess, translations = defaultTranslations }) => {
  const actions = [
    // eslint-disable-next-line react/jsx-key
    { action: <UndoRedo labelRedo="redo" labelUndo="undo" /> },
    { action: <ToggleEdit label={translations.edit} /> },
    { action: <ToggleInsert label={translations.insert} /> },
    { action: <ToggleLayout label={translations.layout} /> },
    { action: <ToggleResize label={translations.resize} /> },
    { action: <TogglePreview label={translations.preview} /> },
  ];
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
        ref={stickyNess.stickyElRef}
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
            {action}
            <div className="react-page-controls-mode-toggle-clearfix" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inner;
