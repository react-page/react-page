# ![Ory Editor](logo.png)
 
This makes digital content creation fun and easy.

*Please be aware that all features and APIs are experimental. Breaking changes will happen.*

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Contribute](#contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Go straight to the [demo](http://ory-editor-demo.herokuapp.com/).

-awesome editing gif-

## Introduction

The Ory Editor is part of the Ory Content Toolchain, a set of tools helping you to build, distribute and manage awesome content.
 
The Ory Editor is not another contenteditable hack. With state of the art browser technology and well designed tooling,
you can finally say goodbye to hacks, html purifiers, steep learning curves, poor markup and complex plugin APIs.

The Ory Editor is a layout editing SDK for JavaScript. What using the Ory Editor looks like is best explained
by the following GIFs and in the [**examples section**](https://editor.ory.am/examples).

## Quickstart

*Note: You actually can't install the Editor via npm at the moment*

Install the Ory Editor via npm, support for bower and CDN will follow soon.

```sh
npm install --save ory-editor
```

Now, run the editor with:

```js
const Editor = require('ory-editor')

const editor = new Editor()

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
```

## Documentation

<!-- The Ory Editor has a [user guide] as well as an [API documentation]. -->

Generate the user guide locally with:

```
$ git clone https://github.com/ory-am/editor.git
$ cd editor
$ npm i -g gitbook-cli
$ gitbook serve -http
```

## Contribute

You need [Node](https://nodejs.org) installed on your system. You can check out this repository with:

```
$ git clone https://github.com/ory-am/editor.git
$ cd editor

# Install depdendencies
$ npm i
```

Here are tasks we usually use when developing:

```
# run the tests in watch mode
$ npm run test:watch 

# run eslint in watch mode
$ npm run lint:watch

# run dev server with live reload
$ npm run dev

# open the editor in your browser
$ open http://localhost:3000/
```

A developer documentation is in the process of being written.
