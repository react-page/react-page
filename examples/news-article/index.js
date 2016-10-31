import './index.css'
import Editor from 'src/editor'

const editor = new Editor()

editor.renderControls()
const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element).then((editable) => {
    editable.onChange(() => {
      // editable.serialize().then((result) => {
      //   console.log('serialize: ', result)
      // })
      //
      editable.renderToHtml().then((result) => {
        console.log('html: ', result)
      })
    })
  })
}
