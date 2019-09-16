# React Page (formerly known as ORY editor)

[![Build Status](https://travis-ci.org/react-page/react-page.svg)](https://travis-ci.org/react-page/react-page)
[![Coverage Status](https://coveralls.io/repos/github/ory-am/editor/badge.svg?branch=master)](https://coveralls.io/github/ory/editor?branch=master)
[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory.gitbooks.io/editor/content/)

React Page is a smart, extensible and modern editor ("WYSIWYG") for the web written in React. If you are fed up with the limitations of `contenteditable`, you are in the right place.

<img width="100%" alt="React Page Demo" src="docs/images/quick-example.gif">

### Bundle Size

We try to keep the initial bundle size low so that you can use this library also to render the content statically without edit functionality.

We achieve that by lazy-loading using `import()` functions. Most modern bundlers like webpack (e.g. in nextjs) support this kind of lazy loading. So the default editor-ui (based on material-ui) is only loaded if the editor is in editMode.

You can additionally use `@react-page/renderer` to have a minimal renderer.

## Documentation

The docs can be found inside the docs folder of this project.

You can follow the [Quick Start](./docs/quick-start.md) to get the basic editor running on your project.

A list of some packages and tools that we provide can be found [here](./docs/packages.md), check this file to see what you can accomplish with this editor.

Finally you can check the rest of the docs [here](./docs/SUMMARY.md)

We also provide docummentations for all of the public api methods, the docs are available [here](./docs/api)

## Attributions

Formely known as ORY Editor

Original Library created by [@aeneasr](https://github.com/aeneasr) [@ory](https://github.com/ory)

[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/_aeneasr)
[![Follow GitHub](https://img.shields.io/badge/follow-github-00cc99.svg)](https://github.com/arekkas)

## Community

join us on slack: https://react page.slack.com
