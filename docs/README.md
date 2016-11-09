# Introduction

Welcome to the ORY Editor guide. Seeing is believing, so let's start with a demo!

## Demonstration

awesome demo here

## Why it's different

Before founding ORY, we built something like the Wikipedia, but for learning. Content is crowd sourced and half a million
users use this platform every month. We had to realize that existing open source content editing solutions had one of the three flaws:

1. The produced markup was horrific, a lot of sanitation had to take place and XSS is a real threat.
2. The author had to use some special mark up, like markdown, before being able to produce content. These mark up solutions
are usually unable to specify a layout.
3. Promising libraries potentially solving the above where abandoned by their maintainers, because it started as a special
use case, or a free-time project.

We concluded that a solution is required and defined the following requirements:

1. The Editor uses state of the art technology and is implemented using cloud native principles.
2. It is easy for developers to integrate and extend the Editor according to their requirements.
3. Designers regulate what content should look like.
4. Authors, technical and non-technical alike, must be able to use the editor without training.
5. The content data must be normalized, reusable and not rely on HTML.
6. The Editor must work on touch devices.

and implemented them in the ORY Editor.

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

In the example above, cells 1.1, 1.1.1.1, 1.1.1.2.1.1, 1.1.1.2.1.2 are all content cells, because they do not have any children rows.
Cells 1.1, 1.1.1.2 are layout cells, because they do have children rows.

Content and layout plugins are simple React components that receive properties such as `onChange`, `readOnly`, `state` by the editor
and render and execute arbitrary logic. The data model can be chosen freely by the plugin author.

With the ORY Editor, you can quickly build layout elements such as background elements. In the next example, we implemented
a very simple background element which is either white or a parallax background:

![Parallax background example](images/parallax-background-example.gif)
