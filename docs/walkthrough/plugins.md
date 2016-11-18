# Plugins

The ORY Editor ships a few handy content plugins:

1. A plugin for [text editing](#text-editing), based on [Slate](http://slatejs.org).
2. A plugin for embedding [images](#image).
3. A plugin for embedding [videos](#video) from Vimeo and YouTube.
4. A [spacer](#spacer) plugin.

As well as the following layout plugin(s):

1. A [spoiler](#spoiler) plugin.

## Installing plugins

Installing the default plugins is as easy as:

```jsx
import { PluginService, plugins } from 'ory-editor'

// And of course import your own plugins too:
//
//  import myPlugin from './myPlugin'

require('react-tap-event-plugin')()

const editor = new Editor({
  plugins: new PluginService([
    // a list of content plugins
    plugins.content.image,
    plugins.content.video,
    plugins.content.spacer,

    // the slate plugin is a function that returns an object
    plugins.content.slate(/* options */),

    // myPlugin
  ], [
    // a list of layout plugins
    plugins.layout.spoiler,
  ])
})
```

## Content plugins

### Text editing

The text editing allows you to create and modify rich-text and is optimized for use with the ORY Editor. We strongly
encourage using our text editing solution.

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="/images/text-editing-plugin.gif"><br>
    <figcaption>The text editing plugin based on <a href="http://slatejs.org">Slate</a></figcaption>
  </figure>
</p>

#### Customize text editing

We wrote the text editing plugin in a way that allows you to customize if you want h1-h6 or lists, and you can even
create your own logic. The documentation on this topic is still work in progress.

### Image

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Image plugin" src="/images/image-plugin.gif"><br>
    <figcaption>The image plugin</figcaption>
  </figure>
</p>

The image plugin is not configurable.

### Video

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Video plugin" src="/images/video-plugin.gif"><br>
    <figcaption>The video plugin</figcaption>
  </figure>
</p>

The video plugin is not configurable.

### Spacer

The spacer is a plugin which you can use to create an empty fixed height cell.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="/images/spacer-plugin.gif"><br>
    <figcaption>The spacer plugin</figcaption>
  </figure>
</p>

The spacer plugin is not configurable.

We encourage you to check out the source code of those plugins. It will reveal a lot of concepts!

## Layout plugins

The ORY Editor ships a few layout plugins per default:

1. A [spoiler](#spoiler) plugin.

### Spoiler

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
