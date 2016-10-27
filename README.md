# ![Ory Editor](logo.png)
 
Build, distribute and manage digital content. Empower designers to enforce design. Save development time.
Amaze authors with extensibility and ease of use.

This repository is under heavy work.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Quickstart](#quickstart)
- [Contribute](#contribute)
- [FAQ](#faq)
  - [How can I run E2E tests using chrome?](#how-can-i-run-e2e-tests-using-chrome)
  - [How can I install the editor using bower?](#how-can-i-install-the-editor-using-bower)
  - [How can I install the editor using the CDN?](#how-can-i-install-the-editor-using-the-cdn)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Go straight to the [demo](http://ory-editor-demo.herokuapp.com/).

-awesome editing gif-

## Introduction

The Ory Editor is part of the Ory Content Toolchain, a set of tools helping you to build, distribute and manage awesome content.
 
The Ory Editor is not another contenteditable hack. With state of the art browser technology and well designed tooling,
you can finally say goodbye to hacks, html purifiers, steep learning curves, poor markup and complex plugin APIs.

The Ory Editor is a layout editing SDK for JavaScript. What using the Ory Editor looks like is best explained
by the following GIFs and in the [**examples section**](https://editor.ory.am/examples).

## Installation

You can install the Ory Editor via npm. Support for bower and CDN will follow soon.

```sh
npm install --save ory-editor
```

You can now run the editor using:

```js
const Editor = require('ory-editor')

const editor = new Editor()

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
```

## Quickstart

The Editor's core strength is the ability to work with plugins. Plugins are wrapped React components that implement

1. layout logic or
2. content logic.

A content block is a leaf node that contains some type of content, for example video, audio, twitter feed and so on.
A layout block is nestable and may contain children or branches. It can be used to place layout elements such as alert boxes,
spoilers, background images and so on.

### Layout Plugin

```js
import React from 'react'

// layout box plugin
const YellowAlertBox = (props) => (<div style={{ backgorundColor: 'yellow' }} {...props} />);

// content editing plugin
const RemoteImage = ({ src, readOnly, onChange }) => readOnly
  ? <img src={src} />
  : <input type="text" onChange={onChange} value={src} />
```

### Content Plugin

## Documentation

The Ory Editor has a [user guide] as well as an [API documentation].

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
