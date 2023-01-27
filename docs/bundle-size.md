We try to keep the initial bundle size low so that you can use this library also to render the content statically without edit functionality.

We achieve that by lazy-loading using `import()` functions. Most modern bundlers like webpack (e.g. in nextjs) support this kind of lazy loading. So the default editor-ui (based on material-ui) is only loaded if the editor is in editMode.
