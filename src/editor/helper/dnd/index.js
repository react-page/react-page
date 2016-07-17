import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropManager } from 'dnd-core'

let defaultManager

export default dragDropContext = () => {
  if (defaultManager) {
    return defaultManager
  }

  defaultManager = new DragDropManager(HTML5Backend)
  return defaultManager
}
