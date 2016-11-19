# Exporting HTML

Exporting HTML is easy, too!

```jsx
const editor = new Editor()
const content = createEmptyState()

const element = document.getElementById('editable')
ReactDOM.render((
  <Editable
    editor={editor}
    state={content}
    onChange={(state) => {
      console.log(editor.renderToHtml(state))
    }}
  />
), element)
```

We are actively working on improving the resulting mark-up as well as providing a minimalistic renderer that works with
your plugins for users that only want to consume content, not edit it.
