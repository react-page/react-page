# Saving the state

The editor notifies you of every change via the `onChange` property:

```jsx
const editor = new Editor()
const content = createEmptyState()

const element = document.getElementById('editable')
ReactDOM.render((
  <Editable
    editor={editor}
    state={content}
    onChange={(newState) => console.log(newState)}
  />
), element)
```
