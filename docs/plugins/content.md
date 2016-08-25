# Content Plugins

Content plugins always receive a `state` prop which holds all of the plugin's data:

```jsx
const MyPlugin = ({ state }) => (
  <div>
    {state.greeting}
  </div>
)
```

Additionally, plugins receive `readOnly` and an `onChange` method:

```jsx
const MyPlugin = ({ readOnly, state, onChange }) => (
  <div>
    { readOnly
        ? state.greeting
        : <input onchange={(e) => onChange({ greeting: e.target.value })} />
    }
  </div>
)
```
