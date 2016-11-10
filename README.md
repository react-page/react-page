# ![ORY Editor](logo.png)

[![Build Status](https://travis-ci.org/ory-am/editor.svg)](https://travis-ci.org/ory-am/editor)
[![Test Coverage](https://codeclimate.com/github/ory-am/editor/badges/coverage.svg)](https://codeclimate.com/github/ory-am/editor/coverage)
[![Code Climate](https://codeclimate.com/github/ory-am/editor/badges/gpa.svg)](https://codeclimate.com/github/ory-am/editor) 
 
[![Join the chat at https://gitter.im/ory-am/hydra](https://img.shields.io/badge/join-chat-00cc99.svg)](https://gitter.im/ory-am/hydra)
[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/bKT3N9)

[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory-am.gitbooks.io/ory-editor/content/)
 
The ORY Editor is part of the ORY Content Toolchain, a set of tools helping you to build, distribute and manage awesome content.
*Note:* Please be aware that all features and APIs are experimental. Breaking changes will happen with every minor release
prior to the 1.0.0 release.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Contribute](#contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

![ORY Editor Demo](https://storage.googleapis.com/ory.am/inline-edit-lg.gif)

and check the [demo](http://editor.ory.am/) yourself.

## Introduction

The ORY Editor is part of the ORY Content Toolchain, a set of tools helping you to build, distribute and manage awesome content.
 
The ORY Editor is different, because it allows you to build responsive layouts. All content is represented by
a JSON object and as no HTML is used, you won't have to worry about HTML input sanitation or
XSS attacks. You can extend functionality and design by writing React components against a small and clear API. Your content
is no longer a snapshot, it is a replayable state machine with deltas. We built the ORY Editor with state of the art
technology and development principles - it's test driven, user experience centered, and cloud native.

## Quickstart

Install the ORY Editor via npm, support for bower and CDN will follow soon.

```sh
$ npm install --save ory-editor
```

Now, run the editor with:

```js
TO BE DONE
```

## Documentation

There is a user guide on [gitbook](https://ory-am.gitbooks.io/ory-editor/content/) available, and you can generate it locally with:

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

# run dev server
$ npm run dev

# open the editor in your browser
$ open http://localhost:3000/
```

A developer documentation is in the process of being written.

## Known issues

There are several [known issues](https://github.com/ory-am/editor/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
regarding text editing. Most of them are upstream issues of [Slate](https://github.com/ianstormtaylor/slate).
