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

import unexpected from 'unexpected'
import { NativeTypes } from 'react-dnd-html5-backend'
import { isNativeHTMLElementDrag } from './index'

const expect = unexpected.clone()

const monitor = result => ({ getItemType: () => result })

describe('isNativeHTMLElementDrag', () => {
  it('should detect file elements', () =>
    expect(isNativeHTMLElementDrag(monitor(NativeTypes.FILE)), 'to be truthy'))
  it('should detect text elements', () =>
    expect(isNativeHTMLElementDrag(monitor(NativeTypes.TEXT)), 'to be truthy'))
  it('should detect url elements', () =>
    expect(isNativeHTMLElementDrag(monitor(NativeTypes.URL)), 'to be truthy'))
  it('should reject non-native elements', () =>
    expect(isNativeHTMLElementDrag(monitor('foo')), 'to be falsy'))
})
