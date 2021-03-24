## slate CellPlugin

We provide an advanced rich text editor as a `CellPlugin` based on [slate](http://slatejs.org).

It has to be installed separatly:

```bash
$ yarn add @react-page/plugins-slate
# OR
$ npm i --save @react-page/plugins-slate
```

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="../docs-images/text-editing-plugin.gif"><br>
    <figcaption>The text editing plugin based on <a href="http://slatejs.org">Slate</a></figcaption>
  </figure>
</p>

## Usage

simply add `@react-page/plugins-slate` as a `cellPlugin` to the editor:

[simple.tsx](examples/pages/examples/simple.tsx ':include :type=code typescript')

By default we provide the following plugins:

- `paragraph`: default paragraph
- `headings`: place headings h1 - h6
- `emphasize`: place em, strong and underline
- `alignment`: allows to align left, right center and justify,
- `lists`: place ordered and unordered lists
- `blockquote`: place a blockquote
- `code`: place code
- `link`: place links

[See the full list here](/packages/plugins/content/slate/plugins/index.tsx)

## Customization

The **slate CellPlugin** itself is highly customizable and has even itself its own plugin sytem!
Not only can you perfectly control how any paragraph, headline or other markup is rendereed,
you can also add custom plugins with their own control.

A common example is to create internal links, where the pages are stored in a database. Instead of asking for the full url,
the user will see a select field of all pages. When the user makes a selection, ReactPage will only store the id of that page.
That way the links will still be valid when the page is moved or renamed.

Another example: if you create a landing page for an ecomerce project, you can enable the webmasters
that will edit this landing page to create links to products from your shop.

To customize the **slate CellPlugin**, call it with a function that changes its default configuration:

```tsx
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';


const myCustomSlatePlugin = slate(def => ({
  ...def, // this is the default configuration
  id: "my-custom-slate-plugin" // if you use multiple different slate plugins at the same time, give each another id
  title: "custom slate plugin",
  description: "it only provides title and text`
  // only select some slate plugins  like headings and paragraphs and default bold/italic/underline
  plugins: {
    headings: def.plugins.headings,
    emphasize: def.plugins.emphasize,
    paragraphs: def.plugins.paragraphs /* make sure to always include that */
  }
  // other overrides
})
```

Now you can pass `myCustomSlatePlugin` as a member of `cellPlugins` to the editor.

Notice: the default export of `@react-page/plugins-slate` is a function that returns a `CellPlugin`. When called without any argument, it will use the default configuration. if you pass a callback function, it will use the configuration you return from that function. This callback function will receive the default configuration. This way you can return the default configuration and alter it as in the example above (using object spread).

### Customize built-in slate plugins

You can customize the provided slate plugins (paragraphs, headings, alignment, etc.) by providing a customize function. It will take the plugin's default config and you can return a new config. Most obvious usecase is to change the component that renders the plugin's content:

```tsx
// any custom component
const RedH1 = ({ style, ...props }: Props) => (
  <h1 style={{ ...style, color: 'red' }} {...props} />
);

const slatePlugin = slate(slateDef => ({
  ...slateDef,
  plugins: {
    emphasize: slateDef.plugins.emphasize,
    headings: {
      // we can customize the h1 by providing a transform function
      h1: slateDef.plugins.headings.h1(h1Def => ({
      ...h1Def, // spread it, so that the new config contains all defaults
      Component: ({style, children}) => (
        <RedH1 style={style}>{children}</RedH1>
      )
    }))
    }
  }
})
```

If you use typescript (and you should!), you will get nice typechecking in the customize function.

### Adding a custom plugin

If you want to add an additional plugin you can add it as well:

```tsx
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

### Create your own custom plugin

If you want to create your own slate plugin, we provide a bunch of factory functions to help you with that:

- `createComponentPlugin`: allows to create a plugin which has a component (most built-in plugins use this factory).
- `createSimpleHtmlBlockPlugin`: a more convenient variant of `createComponentPlugin`. It renders a simple component with a html-tag and has built-in serialization. used by plugins like `headings` or `blockquote`
- `createMarkPlugin`: similar to `createSimpleHtmlBlockPlugin` but renders a "mark" with a hover button on selection
- `createDataPlugin`: this plugin toggles data on the current block or inline element, but does not render a component. E.g. the alignment-plugin uses this factory
  you can import these with:

```tsx
import { pluginFactories } from '@react-page/plugins-slate';
```

### Slate-Plugins with custom data

Some plugins require custom data that the user has to provide. E.g. the `link` plugin needs a `href: string`. Easiest way is to define a jsonSchema for your slate plugin. This will auto-generate a form that can update your plugin.

See the built in link plugin as an example:

[simple.tsx](examples/slate-plugin-src/plugins/links/link.tsx ':include :type=code typescript')

#### For **typescript**-users

As you can see, all factories take a generic type Argument. E.g.

```tsx
type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};


const yourLinkPlugin = createComponentPlugin<LinkData>({
  ...
})
```

this ensures that whenver data is used, the type is correct. Very handy also for consumers of your plugin:

```tsx
const linkWithMyOverrriddenComponent = yourLinkPlugin((def) => ({
  ...def,
  Component: ({ data, children }) => (
    <SuperFancyLink
      href={data.href /* neat! autocompletion and type checking here! */}
    >
      {children}
    </SuperFancyLink>
  ),
}));
```

the consumer could even change the add more properties to the data type, altough its up to him/her to adjust the controls and serialization so that the new DataType is satisfied:

```tsx
const linkWithTracking = yourLinkPlugin<{ campaignTrackingId?: string }>(
  (def) => ({
    ...def,
    Component: ({ href, campaignTrackingId, children }) => (
      <LinkWithTracking href={href} campaignTrackingId={campaignTrackingId}>
        {children}
      </LinkWithTracking>
    ),
    controls:
      def.controls.type === 'autoform'
        ? {
            ...def.controls,
            schema: {
              // this now needs to be compatible to your new data.
              // its best to spread in the default schema (if `yourLinkPlugin` already defines one)
              // and extend it.
              // typescript will help you with that
              ...def.controls.schema,
              properties: {
                ...def.schema.properties,
                campaignTrackingId: {
                  title: 'Campaign Tracking ID',
                  type: 'string',
                },
              },
            },
          }
        : null,

    // deserialize needs to be update, because `campaignTrackingId` is not defined as optional above
    deserialize: {
      // we spread in all defaults, but update getData to also include `campaignTrackingId`
      ...def.deserialize,
      getData: (el) => ({
        ...def.serialization.getData(el),
        campaignTrackingId: 'some-default-id',
      }),
    },
  })
);
```

### Prefilled layouts

You might want to restrict slate in certain layout plugins. E.g. you have a info-box where you only want to allow: h3, bold, emphasize and underline:

```tsx
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


const infobox: CellPlugin = {
  id: 'infobox',
  title: 'Infobox',
  description: 'Some infobox',
  version: 1,
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
          plugin: infoboxSlate
          data: infoboxSlate.createData(({ plugins }) => ({
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
      ],
    ];
  },

}


// dont forget to add this custom plugin to your plugins:

 <Editor
  cellPlugins={[
      defaultSlate,
      infoboxSlate,
      infobox,
  ]}
 onChange={save} />
```

### Examples

#### Example: Simple color plugin

[customSlatePlugin.tsx](examples/plugins/customSlatePlugin.tsx ':include :type=code typescript')

#### Example: Katex plugin

[katexSlatePlugin.tsx](examples/plugins/katexSlatePlugin.tsx ':include :type=code typescript')
