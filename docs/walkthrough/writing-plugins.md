# Writing Plugins

## Writing a content plugin

Of course, you are not limited to this functionality and can easily write
your own plugins. Plugins have two parts, one plugin definition and a
ReactJS component. A minimal plugin definition looks as followed

```jsx
import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import StarIcon from 'material-ui/svg-icons/toggle/star'

// This is the ReactJS component which you can find below this snippet
import InputTextField from './Component'

export default {
  Component: InputTextField,
  IconComponent: <StarIcon />,
  name: 'example/content/input-text-field',
  version: '0.0.1',
  text: 'Input Text Field'
}
```

and a minimalistic plugin example could look like:

```jsx
import React from 'react'

// A callback function for the input field
const onInput = (onChange) => {
  return (e) => {
    // Dispatch the onChange action with the new value
    onChange({
      value: e.target.value
    })
  }
}

const InputTextField = (props) => {
  const {
    state: { value },
    readOnly,
    onChange
  } = props

  // If readOnly is false, it means that we are in edit mode!
  if (!readOnly) {
    return (
      <div className="my-plugin">
        <input
          type="text"
          onChange={onInput(onChange)} value={value} />
      </div>
    )
  }

  // If we are not in edit mode, remove the input field
  return (
    <div className="my-plugin">
      {value}
    </div>
  )
}

export default InputTextField
```

Of course, there are more settings and callbacks available. We encourage checking out the API docs on this topic!

## Writing a layout plugin

Of course, you are not limited to this functionality and can easily write
your own plugins. Plugins have two parts, one plugin definition and a
ReactJS component. A minimal plugin definition looks as followed

```jsx
import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import CropSquare from 'material-ui/svg-icons/image/crop-square'

// This is the ReactJS component which you can find below this snippet
import BlackBackgroundPlugin from './Component'

export default {
  Component: BlackBorderPlugin,
  IconComponent: <CropSquare />,
  name: 'example/layout/black-border',
  version: '0.0.1',
  text: 'Black border'
}
```

and a minimalistic component example could look like:

```jsx
import React from 'react'

const BlackBorderPlugin = ({ children }) => (
  <div style={{ border: '1px solid black', padding: '16px' }}>
    {children}
  </div>
)

export default BlackBorderPlugin
```
