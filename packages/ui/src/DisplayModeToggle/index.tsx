/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
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

const getStickyNessstyle = (stickyness: StickyNess): React.CSSProperties => {
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
  stickyNess: StickyNess;
}> = ({ stickyNess, translations = defaultTranslations }) => (
  <div
    className="ory-controls-mode-toggle-control-group"
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
      <div className="ory-controls-mode-toggle-control">
        <ToggleEdit label={translations.edit} />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleInsert label={translations.insert} />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleLayout label={translations.layout} />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleResize label={translations.resize} />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <TogglePreview label={translations.preview} />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>
    </div>
  </div>
);

export default Inner;
