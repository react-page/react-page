[@react-page/plugins-slate](https://www.npmjs.com/package/@react-page/plugins-slate)

The text editing allows you to create and modify rich-text and is optimized for use with the React Page. We strongly encourage using our text editing solution. You can check more config options about this plugin [here](plugins-slate.md).

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="./images/text-editing-plugin.gif"><br>
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

[See the full list here](/packages/plugins/content/slate/plugins/index.tsx)

If you only want to include some plugins, you can specify them:

```typescript
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';


const slatePlugin = slate(def => ({
  ...def,
  plugins: {
    headings: def.plugins.headings,
    emphasize: def.plugins.emphasize,
    paragraphs: def.plugins.paragraphs /* make sure to always include that */
  }

})

const plugins: Plugins = {
  content: [
    slatePlugin,
    // ...
  ],
  // ...

};

 <Editor plugins={plugins} onChange={save} />

```

or if you want to add an additional plugin, you can use all default plugins like this:

```typescript
import slate from '@react-page/plugins-slate';



const slatePlugin = slate(def => ({
  ...def,
  plugins: {
    ...def.plugins.
    yourCustomNamespace: {
      myCustomPlugin: myCustomPlugin()
    }
  }
})
```

Notice: `yourCustomNamespace` and `myCustomPlugin` can be named arbitrary. Typescript users will find the existing type definition on def.plugins usefull to see which plugins do exist.

You can customize slate plugins by providing a customize function. It will take the plugin's default config and you can return a new config. Most obvious usecase is to change the component that renders the plugin's content:

```typescript
// any custom component
const RedH1 = ({ style, ...props }: Props) => (
  <h1 style={{ ...style, color: 'red' }} {...props} />
);

const slatePlugin = slate(slateDef => ({
  ...slateDef,
  plugins: {
    emphasize: slateDef.plugins.emphasize,
    headings: {
      h1: slateDef.plugins.headings.h1(h1Def => ({
      ...h1Def, // spread it, so that the new config contains all defaults
      Component: ({data, children}) => (
        <RedH1 style={{textAlign: data.get("align")}}>{children}</RedH1>
      )
    }))
    }
  }

})
```

If you use typescript (and you should!), you will get nice typechecking in the customize function.

### Create your own slate plugins

If you want to create your own slate plugins, we provide a bunch of factory functions to help you with that:

- `createComponentPlugin`: allows to create a plugin which has a component (most built-in plugins use this factory).
- `createSimpleHtmlBlockPlugin`: a more convenient variant of `createComponentPlugin`. It renders a simple component with a html-tag and has built-in serialization. used by plugins like `headings` or `blockquote`
- `createMarkPlugin`: similar to `createSimpleHtmlBlockPlugin` but renders a "mark" with a hover button on selection
- `createDataPlugin`: this plugin toggles data on the current block or inline element, but does not render a component. E.g. the alignment-plugin uses this factory
  you can import these with:

```typescript
import { pluginFactories } from '@react-page/plugins-slate';
```

### Slate-Plugins with custom data

Some plugins require custom data that the user has to provide. E.g. the `link` plugin needs a `href: string`. Easiest way is to define a jsonSchema for your slate plugin. This will auto-generate a form that can update your plugin.

[look at the `link` plugin as an example how to do that](/packages/plugins/content/slate/plugins/link/index.tsx)

[See also this helper library for more information](/packages/plugins/createPluginMaterialUi/README.md)

For **typescript**-users: As you can see, all factories take a generic type Argument. E.g.

```typescript
type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};


const yourLinkPlugin = createComponentPlugin<LinkData>({
  ...
})
```

this ensures that whenver data is used, the type is correct. Very handy also for consumers of your plugin:

```jsx
const linkWithMyOverrriddenComponent = yourLinkPlugin((def) => ({
  ...def,
  Component: ({ data, children }) => (
    <SuperFancyLink
      href={data.get('href') /* neat! autocompletion and type checking here! */}
    >
      {children}
    </SuperFancyLink>
  ),
}));
```

the consumer could even change the add more properties to the data type, altough its up to him/her to adjust the controls and serialization so that the new DataType is satisfied:

```typescript
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

### Prefilled layouts

You might want to restrict slate in certain layout plugins. E.g. you have a info-box where you only want to allow: h3, bold, emphasize and underline:

```typescript
// this is the default slate configuration with all plugins
const defaultSlate = slate();

// this will be our restricted slate
const infoboxSlate = slate(def => ({
  ...def,
  id: def.id + '/infobox', // give it some  name, it has to be unique
  hideInMenu: true, // We don't want to show it in the menu, we need it only for layout-plugins
  plugins: {
    headings: {
      h3: def.plugins.headings.h3,
    },
    paragraphs: def.plugins.paragraphs,
    emphasize: def.plugins.emphasize,
  },
}));


const infobox = createLayoutPlugin({
  Renderer: ({ children, state }: any) => (
    <div
      style={{
        border: '1px solid black',
        borderRadius: 4,
        padding: 20
      }}
    >
      {children}
    </div>
  ),
  createInitialChildren: () => {
    return [
      [
        {
          content: {
            plugin: infoboxSlate
            state: infoboxSlate.createInitialSlateState(({ plugins }) => ({
              children: [
                {
                  plugin: plugins.headings.h3,
                  children: ['Hello world'],
                },
                {
                  plugin: plugins.paragraphs.paragraph,
                  children: ['Title and paragraph'],
                },
              ],
            })),
          },
        },

      ],
    ];
  },
  id: 'infobox',
  title: 'Infobox',
  description: 'Some infobox',
  version: 1,
  schema: null
})


// dont forget to add this custom plugin to your plugins:

 <Editor
  plugins={{
    content: [
      defaultSlate,
      infoboxSlate,
      // ...
    ],
    layout: [
      infobox,
      ...
    ]
 }}
 onChange={save} />
```
