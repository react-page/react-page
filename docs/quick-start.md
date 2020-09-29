# Getting started

## Installation

To install the editor, use:

```bash
$ yarn add @react-page/react-page
$ npm i --save @react-page/react-page
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[index.tsx](https://raw.githubusercontent.com/react-page/react-page-examples/master/src/index.tsx ':include :type=code typescript')

That's it, congratulations! You should see something like this now:

![Example app](images/react-example-app.png)

## Readonly

Simply provide a `readOnly={true}` prop to your editor from previous example.  
We will lazy load the unnecessary UI if you use this approach (using code splitting).

This can greatly decrease the size of this lib. Make sure to use this option if you don't require the editing capabilities of the editor and care about your app size (which you should!)

[readonly.tsx](https://raw.githubusercontent.com/react-page/react-page-examples/4853e3c8bfe4d3e35d86a0e224b7aa7ce56e2b79/src/readonly.tsx ':include :type=code typescript')
