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
import { ComponetizedCell } from '../../../types/editable';

const Empty: React.SFC<ComponetizedCell> = ({ id = 'no id given', ...props }) => (
  <div className="ory-cell-empty">
    <strong>An error occurred!</strong>
    <small>
      <dl>
        <dt>Cause:</dt>
        <dd>
          The content plugin could not be found. Check the console to
          investigate the cause.
        </dd>
        <dt>Cell:</dt>
        <dd>{id}</dd>
        <dt>Data:</dt>
        <dd>
          <code>{JSON.stringify(props, null, 4)}</code>
        </dd>
      </dl>
    </small>
  </div>
);

export default Empty;
