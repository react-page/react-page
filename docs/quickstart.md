
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
