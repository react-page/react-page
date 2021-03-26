## Installation

To install the editor, use:

```bash
$ yarn add @react-page/editor
# OR
$ npm i --save @react-page/editor
```

usually you'll also want to have the default rich text editor:

```bash
$ yarn add @react-page/plugins-slate
# OR
$ npm i --save @react-page/plugins-slate
```

Due to technical reasons, you additionaly need to have `@material-ui/core`, `@material-ui/styles` and `@material-ui/icons` installed,
if you already haven't. Don't worry about incresed bundle size: we only load it if its really needed.

```bash
$ yarn add @material-ui/core @material-ui/styles @material-ui/icons
# OR
$ npm i --save @material-ui/core @material-ui/styles @material-ui/icons
```

Make sure to import the css file as well somewhere in your app:

```
import '@react-page/editor/lib/index.css';
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[simple.tsx](examples/pages/examples/simple.tsx ':include :type=code typescript')

That's it, congratulations!

[You should see something like this now (click for the demo)](//demo/examples/simple)

## Readonly

Readonly mode can be used for displaying the content to your users.

Simply provide a `readOnly={true}` prop to your editor.

We won't load any UI related code unless readOnly changes to `false`. In this case, the ui will be lazy loaded if your bundler supports that (e.g. webpack)

[simple.tsx](examples/pages/examples/readonly.tsx ':include :type=code typescript')

(see demo here)](//demo/examples/readonly)
