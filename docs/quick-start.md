## Installation

To install the react-page editor, use:

```bash
$ yarn add @react-page/editor
# OR
$ npm i --save @react-page/editor
```

usually you'll also want to have the default rich text editor (slate):

```bash
$ yarn add @react-page/plugins-slate
# OR
$ npm i --save @react-page/plugins-slate
```

Make sure to import the css file as well somewhere in your app:

```
import '@react-page/editor/lib/index.css';
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[simple.tsx](examples/pages/examples/simple.tsx ':include :type=code typescript')

That's it, congratulations!

[You should see something like this now (click for the demo)](//demo/simple)

## Modes of operation

### Editing

React-page editor together with various plugins can be used to create and subsequently edit pages in a “WYSIWYG” mode. The editing UI code is lazy loaded in this case.

### Viewing

The React-page editor can seamlessly be used to view the pages created by it in a "readonly" mode. The bundle size is reduced in this mode.

Simply pass `readOnly` to the Editor and omit the `onChange`:

[readonly.tsx](examples/pages/examples/readonly.tsx ':include :type=code typescript')

(see demo here)](//demo/examples/readonly)
