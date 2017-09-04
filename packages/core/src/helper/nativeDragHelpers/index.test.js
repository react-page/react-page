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
