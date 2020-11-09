import * as React from 'react';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';

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
}> = ({ stickyNess, translations = defaultTranslations }) => (
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
      <div className="react-page-controls-mode-toggle-control">
        <ToggleEdit label={translations.edit} />
        <div className="react-page-controls-mode-toggle-clearfix" />
      </div>

      <div className="react-page-controls-mode-toggle-control">
        <ToggleInsert label={translations.insert} />
        <div className="react-page-controls-mode-toggle-clearfix" />
      </div>

      <div className="react-page-controls-mode-toggle-control">
        <ToggleLayout label={translations.layout} />
        <div className="react-page-controls-mode-toggle-clearfix" />
      </div>

      <div className="react-page-controls-mode-toggle-control">
        <ToggleResize label={translations.resize} />
        <div className="react-page-controls-mode-toggle-clearfix" />
      </div>

      <div className="react-page-controls-mode-toggle-control">
        <TogglePreview label={translations.preview} />
        <div className="react-page-controls-mode-toggle-clearfix" />
      </div>
    </div>
  </div>
);

export default Inner;
