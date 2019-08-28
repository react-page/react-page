# Content plugins

react-page ships a few handy content plugins per default:

1. A plugin for [text editing](#text-editing), based on [Slate](http://slatejs.org).
2. A plugin for embedding [images](#image).
3. A plugin for embedding [videos](#video) from Vimeo and YouTube.
4. A [spacer](#spacer) plugin.

## Text editing

The text editing allows you to create and modify rich-text and is optimized for use with react-page. We strongly
encourage using our text editing solution.

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="/docs/images/text-editing-plugin.gif"><br>
    <figcaption>The text editing plugin based on <a href="http://slatejs.org">Slate</a></figcaption>
  </figure>
</p>

### Customize text editing

By default we provide the following plugins:

- `alignment`: allows to align left, right center and justify,
- `blockquote`: place a blockquote
- `code`: place code
- `emphasize`: place em, strong and ul tags
- `headings`: place headings h1 - h6
- `link`: place links
- `lists`: place ordered and unordered lists
- `paragraph`: default paragraph

[See the full list here](/packages/plugins/content/slate/plugins/defaultPlugins.tsx)

If you only want to include some plugins, you can specify them:

```
import slate, { slatePlugins } from '@react-page/plugins-slate';


const slatePlugin = slate([
  slatePlugins.headings.h1(),
  slatePlugins.headings.h2(),
  slatePlugins.headings.h3(),
  slatePlugins.emphasize.em(),
  slatePlugins.emphasize.strong(),
  slatePlugins.paragraph() // make sure to always include that
];

const plugins: Plugins = {
  content: [
    slatePlugin,
    // ...
  ],
  // ...

};

const editor = new Editor({
  plugins: plugins,
  // pass the content states
  editables: [
    ...content,
    // creates an empty state, basically like the line above
    createEmptyState(),
  ],
});
```

You can customize slate plugins by providing a customize function. It will take the plugin's default config and you can return a new config. Most obvious usecase is to change the component that renders the plugin's content:

```

// any custom component
const RedH1 = ({ style, ...props }: Props) => (
  <h1 style={{ ...style, color: 'red' }} {...props} />
);

const slatePlugin = slate([
  slatePlugins.headings.h1(def => ({
    ...def, // spread it, so that the new config contains all defaults
    Component: ({data, children}) => (
      <RedH1 style={{textAlign: data.get("align")}}>{children}</RedH1>
    )
  }))
  // ...

```

If you use typescript (and you should!), you will get nice typechecking in the customize function.

### Create your own slate plugins

If you want to create your own slate plugins, we provide a bunch of factory functions to help you with that:

- `createComponentPlugin`: allows to create a plugin which has a component (most built-in plugins use this factory).
- `createSimpleHtmlBlockPlugin`: a more convenient variant of `createComponentPlugin`. It renders a simple component with a html-tag and has built-in serialization. used by plugins like `headings` or `blockquote`
- `createMarkPlugin`: similar to `createSimpleHtmlBlockPlugin` but renders a "mark" with a hover button on selection
- `createDataPlugin`: this plugin toggles data on the current block or inline element, but does not render a component. E.g. the alignment-plugin uses this factory
  you can import these with:

```
import {pluginFactories} from '@react-page/plugins-slate'
```

### Slate-Plugins with custom data

Some plugins require custom data that the user has to provide. E.g. the `link` plugin needs a `href: string`. Easiest way is to define a jsonSchema for your slate plugin. This will auto-generate a form that can update your plugin.

[look at the `link` plugin as an example how to do that](/packages/plugins/content/slate/plugins/link/index.tsx)

[See also this helper library for more information](/packages/plugins/createPluginMaterialUi/README.md)

For **typescript**-users: As you can see, all factories take a generic type Argument. E.g.

```
type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};


const yourLinkPlugin = createComponentPlugin<LinkData>({
  ...
})
```

this ensures that whenver data is used, the type is correct. Very handy also for consumers of your plugin:

```
const linkWithMyOverrriddenComponent = yourLinkPlugin(def => ({
  ...def,
  Component: ({data, children}) => (
    <SuperFancyLink href={data.get("href") /* neat! autocompletion and type checking here! */}>
      {children}
    </SuperFancyLink>
  )
}))

```

the consumer could even change the add more properties to the data type, altough its up to him/her to adjust the controls and serialization so that the new DataType is satisfied:

```

const linkWithTracking = yourLinkPlugin<{campaignTrackingId: string}>(def => ({
  ...def,
  Component: ({data, children}) => (
    <LinkWithTracking href={data.get("href")} campaignTrackingId={data.get("campaignTrackingId")}>
      {children}
    </LinkWithTracking>
  ),
  schema: {
    // this now needs to be compatible to your new data.
    // its best to spread in the default schema (if `yourLinkPlugin` already defines one)
    // and extend it.
    // typescript will help you with that
    ...def.schema,
    required: [...def.schema.required,"campaignTrackingId"]
    properties: {
      ...def.schema.properties,
      campaignTrackingId: {
        title: "Campaign Tracking ID",
        type: "string"
      }
    }
  },
  Controls: null /* if you use schema, set this null, otherwise typescript will complain

  // deserialize needs to be update, because `campaignTrackingId` is not defined as optional above
  deserialize: {
    // we spread in all defaults, but update getData to also include `campaignTrackingId`
    ...def.deserialize,
    getData: el => ({
      ...def.serialization.getData(el),
      campaignTrackingId: "some-default-id"
    })

  }
}))

```

## Image

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Image plugin" src="/docs/images/image-plugin.gif"><br>
    <figcaption>The image plugin</figcaption>
  </figure>
</p>

The image plugin is not configurable.

## Video

The video plugin allows you to add videos to your content by entering their URL. The video plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Video plugin" src="/docs/images/video-plugin.gif"><br>
    <figcaption>The video plugin</figcaption>
  </figure>
</p>

The video plugin is not configurable.

## Spacer

The spacer is a plugin which you can use to create an empty fixed height cell.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="/docs/images/spacer-plugin.gif"><br>
    <figcaption>The spacer plugin</figcaption>
  </figure>
</p>

The spacer plugin is not configurable.

## Create your own plugins

A content plugin in its minimal form is described with this object:

```
{
  Component: YourComponent,
  name: 'some/unique/name',
  version: '0.0.1',
  IconComponent: <YourIcon />,
  text: "Name of the plugin",
  description: "description of the plugin
}
```

`Component` receives the Component that renders the content of your plugin and its controls (if any). It will receive the following props:

- `state` (object): the properties of the plugin. this is usually defined by the Controls of the plugin
- `readOnly` (boolean): true means the editor just shows the content. If false, the editor is in edit mode and you should allow users to configure your Component. Usually you will render the plugins controls if readOnly is false
- `focused` (boolean): whether the plugin is select in edit mode. You should reveal the controls if this property is true
- `onChange`: (function): Call this function with a new `state` to update the `state` of the plugin. This is usally the responsiblity of the controls

Most built-in plugins use a bottom toolbar with a form as Controls. See for example the image plugin which allows to define the image url and other properties.

### Create your own plugin with default material-ui controls

Because it can be tedious to implement controls for a plugin, we started to develop a plugin that make this much easier: `@react-page/create-plugin-materialui`

See [the readme of this library for more information](/packages/plugins/createPluginMaterialUi/README.md)
