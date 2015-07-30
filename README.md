# editor

## How to save?

* Using events/callbacks like *onChange* or *onUpdate*
* Do we have to save nested objects as well?
* How do we decide if we save nested objects as html etc?

```js
editor = new Editor();

editor.onUpdate(function() {

});
```

Content ingestion: What happens if editable areas overlap in the DOM tree?

Wee need editable **objects**, not areas.

-> Only one object can be edited at a time

```
<editable-object>
    <p>Lorem Ipsum...</p>
    <editable-object />
    <p>Lorem Ipsum...</p>
    <editable-object>
        <p>Lorem Ipsum...</p>
        <editable-object />
    </editable-object>
</editable-object>
```

Who handles nesting? Editor? Extensions?  
Maybe use copying with reference instead of injection? (Could work well with server-side rendering - components handle diffs!)

What happens if I update the Text?
* Need to save current "draft"
* Undo/Redo operations (keep the state of everything at all times)
 * How to *not* interfere with undo/redo of components?x

todo
* why isn't IE working?
* 3 stages of content import
  - html data attribute + json (preferred)
  - html data id + json backend (future)
  - plain html(bad, basically "import")
  - some other format import (future, maybe backend service...)
- render service should have options (POST /render)
  - **injectSource:** Should the json source be saved in HTML?
  - **filters:** Some sophisticated filters to prevent XSS, maybe use ML to detect malicious behaviour
  - model could look like: `{id:123, data: {/*..*/}, options: {injectSource: true}}`
- clipboard watching to automatically decide which plugin to use
- shortcuts for inserting plugins