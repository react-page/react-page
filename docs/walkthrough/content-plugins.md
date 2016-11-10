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
ReactJS component. A minimal plugin definition looks as followed

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
todo
```




```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { EditableComponent, ControlsComponent } from 'src/editor'
import VideoPlugin from './plugins/video'
import ContainerPlugin from './plugins/container'
import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import content from './content.js'

require('react-tap-event-plugin')()

const editor = new Editor({
  plugins: new PluginService(defaultContentPlugins, [
    ...defaultLayoutPlugins,
    new VideoPlugin(),
    new ContainerPlugin()
  ])
})

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <EditableComponent
      editor={editor}
      state={content[element.dataset.editable]}
      // onChange={(state) => console.log(state)}
    />
  ), element)
}

ReactDOM.render(<ControlsComponent editor={editor} />, document.getElementById('controls'))

```

## Usage

The Editor's core strength is the ability to work with plugins. Plugins are wrapped React components that implement

1. layout logic or
2. content logic.

A content block is a leaf node that contains some type of content, for example video, audio, twitter feed and so on.
A layout block is nestable and may contain children or branches. It can be used to place layout elements such as alert boxes,
spoilers, background images and so on.


### Layout Plugin

```js
import React from 'react'

// layout box plugin
const YellowAlertBox = (props) => (<div style={{ backgorundColor: 'yellow' }} {...props} />);

// content editing plugin
const RemoteImage = ({ src, readOnly, onChange }) => readOnly
  ? <img src={src} />
  : <input type="text" onChange={onChange} value={src} />
```

### Content Plugin

