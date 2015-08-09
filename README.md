# editor

[![Build Status](https://travis-ci.org/ory-am/editor.svg?branch=master)](https://travis-ci.org/ory-am/editor)

## How to save?

* Using events/callbacks like *onChange* or *onUpdate*
* Do we have to save nested objects as well?
* How do we decide if we save nested objects as html etc?

```js
// myStrategy = new MyStrategy();
editor = new Editor($('.editable'), 'client-id-f29plAIbz10', {
    endpoint: "http://editor.ory.am/api/unstable",
    save: ['DOMImport','Foo','Bar',myStrategy],
    load: []
});


// This is actually covered by the strategies in a better way (with priorities)
// maybe use https://github.com/Olical/EventEmitter
editor.storage.addEventListener('get:before', function(id, data) {
    // transform stuff
    return data;
});
editor.storage.addEventListener('put:after', function(id, data) {
    // Hook into this, save in your own backend, ...
    return data;
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

## editable storage model

```
var Editable = {
    // Will be assigned by editor backend
    uuid uuid
    // Fields contains a list of all fields (e.g. Title, Description, ...)
    // If no fields are given, fallback to exactly one "default" field
    fields: []Field
}

var Field = {
    // Will be assigned by editor backend
    uuid uuid
    // Field.key = 'title';
    key string
    sections: []Section
}

var Section = {
    // Will be assigned by editor backend
    uuid uuid
    // Section.plugin = 'core/medium.js'; // mabye call this appliance instead?
    // Section.plugin = 'plugin-labs/tinyMCE';
    plugin string
    // Section.version = '1.3.1'; // required plugin version
    version string
    // Section.options = {layout: 1}; // Example, will be passed to plugins constructor
    options Object
    // Section.data = '<span>Foobar</span>'; // example 1, will be passed as data to plugin
    // Section.data = {text: 'foobar', bold: {from: 1,to: 2}}; // example 2
    data mixed
}
```

## plugin workflow

```html
<div data-plugin="medium.js" data-version="0.0.2">
    Some <b>content</b>.
</div>
```

```js
var dataset = element.dataset,
    name = dataset.plugin,
    version = dataset.version;

var authentication = new AuthenticationService();
var pm = new PluginManager('https://editor.ory.am/plugins', authentication);
var store = new DataStore();

var extractor = new ExtractionDecider(element),
    data = extractor.extract();

var Plugin = pm.load(plugin, version);

// ...

return (
    <Plugin options={} data={data} store={store}/>
);
```

PluginManager:

```js
var PluginManager = function(endpoint, authentication) {
    // this.endpoint = endpoint;
}

PluginManager.prototype.load(plugin, version) {
    // is already loaded? if not do:
    // result = GET endpoint + ?plugin=plugin + ?version=version
    // md5check(result)
    // run isolated eval(result)
    // "cache" handler
    // return handler
}

```

### Licenses

**Slideout**
* https://github.com/Mango/slideout/blob/master/LICENSE
* The MIT License (MIT) - Copyright (c) 2015 Mango
