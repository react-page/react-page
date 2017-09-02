// @flow
import { NativeTypes } from 'react-dnd-html5-backend'

export default (monitor: Object): Boolean => {
  switch (monitor.getItemType()) {
    case NativeTypes.URL:
    case NativeTypes.FILE:
    case NativeTypes.TEXT:
      return true
    default:
      return false
  }
}
