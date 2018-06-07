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

We already covered what layout and content cells are. This section is dedicated to plugins for content cells. You
are not limited to our plugins. Before you start creating your own, we encourage you to check out the source codes
of the available plugins. It will reveal a lot of concepts!

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

## Layout plugins

Layout cells are nodes in the tree that have children, but also a plugin. Layout plugins are usually for theming your
content or building components that span multiple content cells.We ship one such plugin:

1. The [spoiler](#spoiler) plugin.

### Spoiler

The spoiler (aka "hidden text") plugin hides content, and the user has to click on the content in order to see it.
