# aeneasr/ory-editor

[![Build Status](https://travis-ci.org/ory/editor.svg)](https://travis-ci.org/aeneasr/editor)
[![Coverage Status](https://coveralls.io/repos/github/ory-am/editor/badge.svg?branch=master)](https://coveralls.io/github/ory/editor?branch=master)
[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory.gitbooks.io/editor/content/)

[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/_aeneasr)
[![Follow GitHub](https://img.shields.io/badge/follow-github-00cc99.svg)](https://github.com/arekkas)

The ORY Editor is a smart, extensible and modern editor ("WYSIWYG") for the web written in React. If you are fed up with the limitations of `contenteditable`, you are in the right place.

<a href="docs/images/quick-example.gif"><img align="left" width="40%" alt="ORY Editor demo" src="docs/images/quick-example.gif"></a>

The ORY Editor is used at Germany's largest (~800k uniques per month) E-Learning Website
[www.serlo.org](http://de.serlo.org) to improve the wiki experience.

Check out the demo at [ory-editor.aeneas.io](https://ory-editor.aeneas.io/)!

<br clear="both">
<br clear="both">
<br clear="both">

> **IMPORTANT**: This editor is pre-release and backwards compatibility is not guaranteed. It is maintained as a personal project by its author and core-maintainer [Aeneas Rekkas](http://github.com/aeneasr/).

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
The experience and the lessons learned made me embark on the journey to build the ORY Editor.
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

With these principles in mind, I went out and implemented the ORY Editor, which you are looking at right now.

## Quickstart

Currently the focus is on optimizing the ORY Editor for usage with React. Versions that do
not require React in the future may be shipped at some point. **Please check the [ReactJS tutorial](https://ory.gitbooks.io/editor/content/tutorials.html#reactjs-example)!**

```
$ npm install --save ory-editor
```

*Note: The `ory-editor` package is a metapackage. It includes the core, the default ui and some officially supported plugins. Use this package primarily for convenience.*

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
$ yarn i
```

To work properly, you'll need [yarn](https://yarnpkg.com/lang/en/).

### Run the example(s)

Here are some [examples](examples/) that are a good starting point if you want to familiarize yourself with the editor.
To run the examples, use one of the following commands:

```
$ yarn run build
$ cd examples
$ yarn run start
```

### Run the toolchain

The toolchain contains tests and tslint. It is highly recommended to run this toolchain while developing.

```bash
# run the tests in watch mode
$ yarn run test:watch

# run eslint in watch mode
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

## Known issues
Occasionally you might see this error
```
Error: EPERM: operation not permitted, unlink 'C:\Coding\forks\editorBranches\editor\packages\ui\lib\DisplayModeToggle\index.d.ts'
```
when running build inside vscode. This appears to be a known issue with the editor locking declaration files. Just rerun build (and be patient while somebody fixes this for you).

Known issues are tracked in the [issues tab](https://github.com/ory/editor/issues?q=is%3Aopen+is%3Aissue+label%3Abug).
