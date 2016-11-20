# Introduction

Welcome to the ORY Editor guide. Seeing is believing, so let's start with a demo!

## Demonstration

![ORY Editor Demo](https://storage.googleapis.com/ory.am/inline-edit-lg.gif)

This a demo available at [editor.ory.am](http://editor.ory.am/) so go ahead and try it yourself!

## Why it's different

Before founding ORY, we built something [like the Wikipedia](https://de.serlo.org), but for learning. The content is
crowd sourced and over half a million people use this platform every month. We had to realize that existing open source
content editing solutions had one of the three flaws:

1. The produced markup was horrific, a lot of sanitation had to take place and XSS is always a threat.
2. The author must learn special mark up, like markdown, before being able to produce content. These text-based solutions
are usually unable to specify a layout and complex data structures like tables are annoying to edit.
3. Promising libraries potentially solving the above where abandoned by their maintainers, because it started as a special
use case, or a free-time project.

We concluded that a solution must meet the following principles:

1. The state is a normalized JSON object, no HTML involved.
2. It is a visual editor that does not require programming experience or special training.
3. It is built by a company, reducing the likelihood of abandonment.
4. Based on reusable React Components, it gives developers, authors and designers new ways of working together and creating
better and richer experiences more easily.
5. It works on mobile and touch devices.

With these principles in mind, we went out and implemented the ORY Editor, which you are looking at right now.

## How it works

The ORY Editor is primarily a tool to create and modify layouts. At the core, there are *Cells* and *Rows*. The layout
system is very similar to the [bootstrap grid system](http://getbootstrap.com/css/#grid) where you have
rows and columns.

An empty editable ("document") is a cell without any children. As you create new cells, the structure quickly changes to something like this:

```
1. Editable
  1. Cell
    1. Row
      1. Cell (text)
      2. Cell (parallax background image)
        1. Row 
          1. Cell (image)
          2. Cell (image)
    2. Row
      1. Cell (image)
      2. Cell (image)
```

Cells can be populated with plugins, such as a text editor or rich media (video, audio). There are two types of cells,
*layout cells* and *content cells*. Content cells are always leafs in the tree, meaning that they do not have any children.
Layout cells are always branches, meaning that they do have children. A content cell is usually text, media (video, audio) whilst
layout cells are usually things like a spoiler box, a parallax background image and so on.

<p>
  <figure align="center">
    <img alt="A content cell" src="/images/content-cell.png"><br>
    <figcaption>A content cell</figcaption>
  </figure>
</p>

In the example above, cells 1.1.1.1, 1.1.1.2.1.1, 1.1.1.2.1.2 are all content cells, because they do not have any children rows.
Cells 1.1, 1.1.1.2 are layout cells, because they do have children rows.

<p>
  <figure align="center">
    <img alt="A layout cell" src="/images/layout-cell.gif"><br>
    <figcaption>A layout cell</figcaption>
  </figure>
</p>

Content and layout plugins are simple React components that receive properties such as `onChange`, `readOnly`, `state` by the editor
and render and execute arbitrary logic. The data model can be chosen freely by the plugin author.
