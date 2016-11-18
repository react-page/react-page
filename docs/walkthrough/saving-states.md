# Saving the state

The editor notifies you of every change via the `onChange` property:

```jsx
const content = { /* document state */ }

ReactDOM.render((
  <Editable
    editor={editor}
    state={content}
    onChange={(newState) => console.log(newState)}
  />
), element)
```
