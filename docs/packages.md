# Packages

The editor consists of multiple packages. A meta package available at [react-page](https://www.npmjs.com/package/@react-page/react-page).

## [@react-page/editor](https://www.npmjs.com/package/@react-page/editor)

This is the (new) default editor that can be used both for editing and for showing content.

## [@react-page/core](https://www.npmjs.com/package/@react-page/core)

This package is the React Page's core. It contains the logic for creating and modifying layouts and is responsible for
handling plugins.

## [@react-page/ui](https://www.npmjs.com/package/@react-page/ui)

This repository contains React Page UI React Components that are based on
[mui-org/material-ui](https://github.com/mui-org/material-ui). While there is no need for you to use them, they
offer an easy way to start working with the React Page. `@react-page/editor` uses this ui as default

## [@react-page/renderer](https://www.npmjs.com/package/@react-page/renderer)

This package contains rendering components for React Page states. Currently, only HTML rendering is supported. The
HTML rendering component is responsible for outputting static HTML and mounting dynamic plugins on the user-agent side.

`@react-page/editor` will use the htmlRenderer when in readOnly mode
