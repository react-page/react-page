import unexpected from 'unexpected'
import { NativeTypes } from 'react-dnd-html5-backend'
import isNativeDragElement from './index'

const expect = unexpected.clone()

const monitor = (result) => ({ getItemType: () => result })

describe('isNativeHTMLElementDrag', () => {
  it('should detect file elements', () => expect(isNativeDragElement(monitor(NativeTypes.FILE)), 'to be truthy'))
  it('should detect text elements', () => expect(isNativeDragElement(monitor(NativeTypes.TEXT)), 'to be truthy'))
  it('should detect url elements', () => expect(isNativeDragElement(monitor(NativeTypes.URL)), 'to be truthy'))
  it('should reject non-native elements', () => expect(isNativeDragElement(monitor('foo')), 'to be falsy'))
})
