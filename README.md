# React Page (formerly known as ORY editor)

[![Build Status](https://travis-ci.org/react-page/react-page.svg)](https://travis-ci.org/react-page/react-page)
[![Coverage Status](https://coveralls.io/repos/github/ory-am/editor/badge.svg?branch=master)](https://coveralls.io/github/ory/editor?branch=master)
[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory.gitbooks.io/editor/content/)

React Page is a smart, extensible and modern editor ("WYSIWYG") for the web written in React. If you are fed up with the limitations of `contenteditable`, you are in the right place.

<a href="docs/images/quick-example.gif"><img align="left" width="40%" alt="React Page Demo" src="docs/images/quick-example.gif"></a>

ReactPage is used at Germany's largest (~800k uniques per month) E-Learning Website
[www.serlo.org](http://de.serlo.org) to improve the wiki experience.

Check out the demo at [ory-editor.aeneas.io](https://ory-editor.aeneas.io/)!

<br clear="both">
<br clear="both">
<br clear="both">


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
  - [What's the problem?](#whats-the-problem)
  - [What makes it different?](#so-whats-different)
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

I have been part of the [Wikipedia for learning](https://de.serlo.org) for almost a decade now.
The experience and the lessons learned made me embark on the journey to build ReactPage.
I wanted to make content editing on the web easy and enrich the Open Source Community with technology that moves
the needle significantly for how content is created and edited on the web.

### What's the problem?

I had to realize that existing open source content editing solutions had one of the three flaws:

* The produced markup was horrific, a lot of sanitation had to take place and XSS is always a threat.
* The author must learn special mark up, like markdown, before being able to produce content. These text-based solutions are usually unable to specify a layout and complex data structures like tables are annoying to edit.
* Editors based on contenteditable are unable to work with layouts (e.g. flexbox or floating grids).

### So what's different?

I concluded that a solution must meet the following principles:

* The state is a normalized JSON object, no HTML involved.
* It is a visual editor that does not require programming experience or special training.
* Based on reusable React Components, it gives developers, authors and designers new ways of working together and creating better and richer experiences more easily.
* It works on mobile and touch devices.

With these principles in mind, I went out and implemented the React Page, which you are looking at right now.

## Quickstart

Currently the focus is on optimizing ReactPage for usage with React. Versions that do
not require React in the future may be shipped at some point. **Please check the [ReactJS tutorial](https://ory.gitbooks.io/editor/content/tutorials.html#reactjs-example)!**

```
$ npm install --save @react-page/react-page
```

*Note: The `@react-page/react-page` package is a metapackage. It includes the core, the default ui and some officially supported plugins. Use this package primarily for convenience.*

## Documentation

Check out the [user guide on gitbook](https://ory.gitbooks.io/editor/content/).

## How to run, develop, and contribute

Do you want to run, develop or contribute to ReactPage? For that you need [Node](https://nodejs.org) installed on
your system. Use git to check out this repository as followed.

```bash
$ git clone https://github.com/react-page/react-page.git
$ cd editor
```

### Install dependencies

ReactPage is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) that you initialize with:

```bash
$ npm i
$ npm run bootstrap
```

You can also use [yarn](https://yarnpkg.com/lang/en/).

```bash
$ yarn
$ yarn bootstrap
```

### Run the example(s)

Here are some [examples](examples/) that are a good starting point if you want to familiarize yourself with the editor.
To run the examples, use one of the following commands:

```
$ npm run start
```

### Run the toolchain

The tool chain contains tests and tslint. It is highly recommended to run this while developing.

```bash
# run the tests in watch mode
$ yarn run test:watch

# run tslint in watch mode
$ yarn run lint:watch
```

### Run the documentation

To run the guide in watch mode, do:

```bash
$ yarn run docs:guide
```

To generate API docs, run:

```bash
$ yarn run docs:api
```

### Recommended tools

Feel free to use whatever works for you, these works for us. Especially care about using "prettier" when writing code as it will avoid merge conflicts on code style.

IDE: vscode
Vscode extensions: prettier, tslint, code spell checker, beautify css/sass/scss/less

## Known issues
### Types resolution error

In case you change a lot of files, especially in core or UI, you might end up seeing old versions of these files when working on plugins. To fix this, run 
```
$ npm run build:lib
```
Which builds the library code. If this doesn't help (and you're in vscode), make sure to reload window (CTRL+SHIFT+P -> Reload Window). That forces vscode to reinitialize typescript declaration files.

### Other issues

Known issues are tracked in the [issues tab](https://github.com/react-page/react-page/issues?q=is%3Aissue+is%3Aopen+label%3Abug).

## Attributions

Formely known as ORY Editor

Original Library created by [@aeneasr](https://github.com/aeneasr) [@ory](https://github.com/ory)

[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/_aeneasr)
[![Follow GitHub](https://img.shields.io/badge/follow-github-00cc99.svg)](https://github.com/arekkas)

## Community

join us on slack: https://reactpage.slack.com
