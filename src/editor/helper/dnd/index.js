import { DragDropManager } from 'dnd-core'
import HTML5Backend from 'react-dnd-html5-backend'

let defaultManager

export default () => {
  if (defaultManager) {
    return defaultManager
  }

  defaultManager = new DragDropManager(HTML5Backend)
  return defaultManager
}
