import Editor from 'src/editor'
import content from './content'

const editor = new Editor()

editor.renderControls()
const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element, content[element.dataset.id]).then((editable) => {
    editable.onChange(() => {
      // editable.serialize().then((result) => {
      //   console.log('serialize: ', result)
      // })
      //
      // editable.renderToHtml().then((result) => {
      //   console.log('html: ', result)
      // })
    })
  })
}
