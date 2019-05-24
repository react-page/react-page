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

import Provider from '../Provider/index';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import { ProviderProps } from './../Provider/index';

const defaultTranslations = {
  edit: 'Edit things',
  insert: 'Add things',
  layout: 'Move things',
  resize: 'Resize things',
  preview: 'Preview result',
};

const Inner: React.SFC<ProviderProps & { translations?: typeof defaultTranslations}> = ({ translations = defaultTranslations, ...rest }) => (
  <Provider {...rest}>
    <div className="ory-controls-mode-toggle-control-group">
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
  </Provider>
);

export default Inner;
