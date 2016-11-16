# Content plugins

The ORY Editor ships a few handy plugins per default:

1. A plugin for [text editing](https://github.com/ory-am/editor/tree/master/src/editor/plugins/content/slate),
based on [Slate](slatejs.org).
2. A plugin for [embedding images](https://github.com/ory-am/editor/tree/master/src/editor/plugins/content/image).
3. A plugin for [embedding videos](https://github.com/ory-am/editor/tree/master/src/editor/plugins/content/video) from Vimeo and YouTube.
4. A [spacer plugin](https://github.com/ory-am/editor/tree/master/src/editor/plugins/content/spacer).

We encourage you to check out the image, video and spacer plugins!
Of course, you are not limited to this functionality and can easily write
your own plugins. Plugins have two parts, one plugin definition and a
ReactJS component. A minimal plugin definition looks as follows

```jsx
import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import StarIcon from 'material-ui/svg-icons/toggle/star'

// This is the ReactJS component which you can find below this snippet
import MyPluginComponent from './Component'

export default {
  Component: MyPluginComponent
  name: 'example/content/my-plugin'
  version: '0.0.1'
  icon: <StarIcon />
  text: 'Icon'
}
```

and a minimalistic plugin example could look like

```jsx
import React from 'react'

const FaIcon = (props) => {
  const {
    state: { value },
    readOnly
  } = props
  
  return (
    <div>
      {
        readOnly ? (
          <div className="my-plugin">
            <input type="text" onChange={(e) => onChange({ value: e.target.value })} value={value} />
          </div>
        ) : (
          <div className="my-plugin">{value}</div>
        )
      }
    </div>
  )
}

export default FaIcon
```
