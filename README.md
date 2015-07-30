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

## Usecase

```html
<html>
    <head></head>
    <body>
        <header><!-- ... --></header>
        
        <div class="category">
            <h2>
                Machine learning
            </h2>
            <article>
                <h3>Linear regression</h3>
                <div>
                    <img class="xxl" src="/lin-heading.png">                      
                </div>
                <p>
                    As well as formatting the selection inside of an editable, you will want your buttons to also reflect the formatting at the selection inside of an editable.
                </p>
                <div class="media">
                    <object>http://youtube.com/...</object>
                </div>
                <div>
                    <table>
                        <tr>
                            <td>A</td>
                            <td>B</td>
                        </tr>
                        <tr>
                            <td>C</td>
                            <td>D</td>
                        </tr>
                    </table>
                </div>
            </article>
            <article>
                <h3>Neuronal networks</h3>
                <p>
                    Lorem ipsum dolor sit amet.
                    Sooner or later you'll need more for UI than just a caret, so the next section shows you how to add a simple bold button to your UI.
                    Once an editable is initialized you will see that Aloha Editor uses a blinking DIV element as the caret.
                    This caret is the <a href="visual">minimal visual</a> user interface (which you can style and animate with CSS, by the way).
                </p>
                <div class="row">
                    <div class="col-xs-6">
                        Lorem ipsum dolor sit amet.      
                    </div>
                    <div class="col-xs-6">
                        <img src="/someimage.png" alt="Lorem ipsum">  
                    </div>
                </div>
            </article>
        </div>
        <article>
        </article>
        
        <footer><!-- ... --></footer>
    </body>
</html>
```

```html
<div>
    static
    <layout>
        <row app="" class="row" options="{'foo':'bar'}">
            <col class="col-xs">
                <div contenteditable="true">
                    asdf fdsa asdf
                </div>
            </col>
        </row>
    </layout>
</div>
<layout>
    <row app="" class="row" options="{'foo':'bar'}">
        <col class="col-xs">
            <div contenteditable="true">
                asdf fdsa asdf
            </div>
        </col>
    </row>
</layout>
```

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
