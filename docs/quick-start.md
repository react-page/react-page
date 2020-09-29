# Getting started

## Philosophy

The goal of react-page is to create a simple to use, simple to configure full page editor with react. In order to achieve these somewhat self contradicting goals, we offer a few different ways to use the editor in your project. The editor also comes with optional user interface (UI package). You can choose to use it or create your own. Let's explore a few different approaches to setting up your editor.

Before we skip ahead, make sure that [node.js](https://nodejs.org/en/) is installed on your system.

## Installation

To install the editor, use:

```
$ yarn add @react-page/react-page
$ npm i --save @react-page/react-page
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[index.tsx](https://raw.githubusercontent.com/react-page/react-page-examples/master/src/index.tsx ':include :type=code')

That's it, congratulations! You should see something like this now:

![Example app](images/react-example-app.png)

## Readonly

Simply provide a `readOnly={true}` prop to your editor from previous example. We will lazy load (using code splitting) the unnecessary UI if you use this approach. This can greatly decrease the size of this lib. Make sure to use this option if you don't require the editing capabilities of the editor and care about your app size (which you should!)
