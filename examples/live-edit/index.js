// @flow
/* eslint-disable no-underscore-dangle, no-use-before-define */
import './index.css'
import Editor from 'src/editor'
import io from 'socket.io-client'
import content from './content'
import * as cellActions from 'src/editor/actions/cell'
import * as displayActions from 'src/editor/actions/display'

const socket = io.connect()

const synch = () => (next: any) => (action: any) => {
  const result = next(action)
  if (action._dont) {
    return result
  }

  switch (action.type) {
    case displayActions.SET_DISPLAY_MODE:
      socket.emit('change', action)
      console.log('SET_DISPLAY_MODE', action)
      break
    case cellActions.CELL_INSERT_ABOVE:
    case cellActions.CELL_INSERT_BELOW:
    case cellActions.CELL_INSERT_LEFT_OF:
    case cellActions.CELL_INSERT_RIGHT_OF:
    case cellActions.CELL_INSERT_INLINE_LEFT:
    case cellActions.CELL_INSERT_INLINE_RIGHT:
      socket.emit('change', {
        ...action,
        item: editor.content.serialize(action.item)
      })
      console.log('CELL_INSERT', {
        ...action,
        item: editor.content.serialize(action.item)
      })
      break
    case cellActions.CELL_RESIZE:
      socket.emit('change', action)
      console.log('CELL_RESIZE', action)
      break
    case cellActions.CELL_UPDATE_CONTENT:
    case cellActions.CELL_UPDATE_LAYOUT:
      socket.emit('change', action)
      console.log('CELL_UPDATE', action)
      break
    default:
      return
  }

  return result
}

const editor = new Editor({
  middleware: [synch]
})

socket.on('update', (action: any) => {
  const { store } = editor
  console.log('update got', action)

  switch (action.type) {
    case cellActions.CELL_INSERT_ABOVE:
    case cellActions.CELL_INSERT_BELOW:
    case cellActions.CELL_INSERT_LEFT_OF:
    case cellActions.CELL_INSERT_RIGHT_OF:
    case cellActions.CELL_INSERT_INLINE_LEFT:
    case cellActions.CELL_INSERT_INLINE_RIGHT:
      store.dispatch({
        ...action,
        item: editor.content.unserialize(action.item),
        _dont: true
      })
      break
    default:
      store.dispatch({
        ...action,
        _dont: true
      })
  }
})

editor.renderControls()
const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element, content[element.dataset.id])
}
