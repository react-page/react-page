# Walkthrough

## Packages

The editor consists of multiple packages. A meta package available at [ory-editor](https://www.npmjs.com/package/ory-editor).

## [ory-editor-core](https://www.npmjs.com/package/ory-editor-core)

This package is the ORY Editor's core. It contains the logic for creating and modifying layouts and is responsible for
handling plugins.

## [ory-editor-ui](https://www.npmjs.com/package/ory-editor-ui)

This repository contains ORY Editor UI React Components that are based on
[callemall/material-ui](https://github.com/callemall/material-ui). While there is no need for you to use them, they
offer an easy way to start working with the ORY Editor.

## [ory-editor-renderer](https://www.npmjs.com/package/ory-editor-renderer)

This package contains rendering components for ORY Editor states. Currently, only HTML rendering is supported. The
HTML rendering component is responsible for outputting static HTML and mounting dynamic plugins on the user-agent side.

## Plugins

### [ory-editor-plugins-slate](https://www.npmjs.com/package/ory-editor-plugins-slate)

The text editing allows you to create and modify rich-text and is optimized for use with the ORY Editor. We strongly
encourage using our text editing solution.

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="/images/text-editing-plugin.gif"><br>
    <figcaption>The text editing plugin based on <a href="http://slatejs.org">Slate</a></figcaption>
  </figure>
</p>

### [ory-editor-plugins-image](https://www.npmjs.com/package/ory-editor-plugins-image)

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Image plugin" src="/images/image-plugin.gif"><br>
    <figcaption>The image plugin</figcaption>
  </figure>
</p>

The image plugin is not configurable.

### [ory-editor-plugins-video](https://www.npmjs.com/package/ory-editor-plugins-video)

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Video plugin" src="/images/video-plugin.gif"><br>
    <figcaption>The video plugin</figcaption>
  </figure>
</p>

The video plugin is not configurable.

### [ory-editor-plugins-spacer](https://www.npmjs.com/package/ory-editor-plugins-spacer)

The spacer is a plugin which you can use to create an empty fixed height cell.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="/images/spacer-plugin.gif"><br>
    <figcaption>The spacer plugin</figcaption>
  </figure>
</p>

The spacer plugin is not configurable.

### [ory-editor-plugins-parallax-background](https://www.npmjs.com/package/ory-editor-plugins-parallax-background)

The parallax background plugin is a layout plugin, allowing you to add a parallax background image to your content.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="/images/parallax-background.gif"><br>
    <figcaption>The parallax background plugin</figcaption>
  </figure>
</p>

The parallax background plugin is not configurable.
