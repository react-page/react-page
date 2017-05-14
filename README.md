# ![ORY Editor](docs/images/ory-editor-github.jpg)

[![Build Status](https://travis-ci.org/ory/editor.svg)](https://travis-ci.org/ory/editor)
[![Coverage Status](https://coveralls.io/repos/github/ory-am/editor/badge.svg?branch=master)](https://coveralls.io/github/ory/editor?branch=master)
[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory.gitbooks.io/editor/content/)

[![Join the chat at https://gitter.im/ory/hydra](https://img.shields.io/badge/join-chat-00cc99.svg)](https://gitter.im/ory-am/editor)
[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/bKT3N9)
[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/_aeneasr)
[![Follow GitHub](https://img.shields.io/badge/follow-github-00cc99.svg)](https://github.com/arekkas)

The ORY Editor is an highly extensible WYSI (what you see is) layout editor for rich HTML
content (rich text, videos, applets, tables, twitter feeds, ...). If you are fed up with the limitations
of `contenteditable`, you are in the right place.

The ORY Editor is used at Germany's largest (~800k uniques per month) E-Learning Website
[www.serlo.org](http://de.serlo.org) to improve the wiki experience.

We use the ORY Editor for [ORY Sites](#ory-sites), a tool for creating websites. It's similar to squarespace, but it works
offline, the sites you created are stored *on your device*, and you are able to add your own layouts and plugins to it.

Check out our demo at [editor.ory.am](http://editor.ory.am/)!

*Please Note:* The features, APIs and docs of the ORY Editor are new and very young. We cannot always guarantee
backwards compatibility but we try our best! We are looking for your help also to find issues and
improve the overall experience, APIs and documentation.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
  - [What makes it different?](#what-makes-it-different)
  - [ORY Sites](#ory-sites)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [How to run, develop, and contribute](#how-to-run-develop-and-contribute)
  - [Install dependencies](#install-dependencies)
  - [Run the example(s)](#run-the-examples)
  - [Run the toolchain](#run-the-toolchain)
  - [Run the documentation](#run-the-documentation)
- [Known issues](#known-issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

We have been running the [Wikipedia for learning](https://de.serlo.org) for almost a decade now.
The experience and the lessons learned made us embark on the journey to build the ORY Editor.
We wanted to make content editing on the web easy and enrich the Open Source Community with technology that moves
the needle significantly for how content is created and edited on the web.

### What makes it different?

In contrast to WYSIWYG editor such as [TinyMCE](https://www.tinymce.com) or [CKEditor](http://ckeditor.com/) we do
**not rely on html for state serialization**, but instead use a **well-defined JSON structure** and a predictable state container
called [redux](https://github.com/reactjs/redux). All state transformations are unit-tested for correct behaviour and
replayable - making collaboration and global undo / redo possible.

We felt that popular open source WYSIWYG editors fail to provide a decent layout solution. We observed authors who regularly
use invisible tables with fixed widths for layouts - a work around that breaks your content on devices with small
screens. Site builder plugins for popular CMS solve this sometimes, but there is no good open source alternative.

Most WYSIWYG editors force too much functionality into `contenteditable`, such as tables, twitter cards, youtube videos
and more. The ORY Editor is built plugin-first - every layout and content is a plugin. And plugins are simple React Components,
that you can write yourself.

### ORY Sites

We are building a platform called ORY Sites for creating, managing and publishing websites. In contrast to existing
providers such as [squarespace.com](https://www.squarespace.com/), [wix.com](http://wix.com/), and others, you have all
your content stored locally. The build is static html, css and client-side javascript and you are free to host it
on ORY Sites, GitHub Pages, AWS S3, or anywhere you like.

Because ORY Sites comes with a desktop app, it even works when you do not have internet connection.
The app is built on top of the ORY Editor, allowing you to integrate plugins you write yourself, or plugins from
third-parties. The ORY Sites app is completely free and we provide paid services that save you time
and money.

Compared to popular open source content management systems like drupal or wordpress, there are no security updates
necessary, because ORY Sites uses plain html files to serve your site - no SQL or XSS injections possible. Yet,
content, layout and behaviour is very customizable.

If this caught your attention, sign up for our newsletter and get an exclusive beta access to the ORY Sites App!

<p align="center">
  <strong><a href="http://eepurl.com/cwtSPL">>> Join Newsletter <<</a></strong>
</p>

## Quickstart

Currently our focus is on optimizing the ORY Editor for usage with React. We will work on, and ship versions that do
not require React in the future. **Please check the [ReactJS tutorial](https://ory.gitbooks.io/editor/content/tutorials.html#reactjs-example)!**

```
$ npm install --save ory-editor
```

*Note: The `ory-editor` package is a metapackage. It includes the core, our default ui and some plugins we
officially support. Use this package primarily for convenience.*

## Documentation

Check out the [user guide on gitbook](https://ory.gitbooks.io/editor/content/).

## How to run, develop, and contribute

Do you want to run, develop or contribute to the ORY Editor? For that you need [Node](https://nodejs.org) installed on
your system. Use git to check out this repository as followed.

```bash
$ git clone https://github.com/ory/editor.git
$ cd editor
```

### Install dependencies

The ORY Editor is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) that you initialise with:

```bash
$ npm i
```

### Run the example(s)

Here are some [examples](examples/) that are a good starting point if you want to familiarize yourself with the editor.
To run the examples, use one of the following commands:

```
$ npm run build
$ cd examples
$ npm run start
```

### Run the toolchain

Our toolchain contains tests, eslint and flow types. We highly recommend to run this toolchain while developing.

```bash
# run the tests in watch mode
$ npm run test:watch

# run eslint in watch mode
$ npm run lint:watch

# run flowtype in watch mode
$ npm run flow:watch
```

### Run the documentation

To run the guide in watch mode, do:

```bash
$ npm run docs:guide
```

## Known issues

We keep track of known issues in the [issues tab](https://github.com/ory/editor/issues?q=is%3Aopen+is%3Aissue+label%3Abug).
