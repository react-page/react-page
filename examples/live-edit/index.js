// @flow
import './index.css'
import Editor from 'src/editor'
import io from 'socket.io-client'
const socket = io.connect()

const synch = store => next => action => {
  const result = next(action)
  if (action._dont) {
    return result
  }

  socket.emit('change', action)
  return result
}

const editor = new Editor({
  middleware: [synch]
})

socket.on('update', data => {
  const { store } = editor
  console.log('update got', data)
  store.dispatch({
      ...data,
    _dont: true
  })
})

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
