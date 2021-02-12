## ReactAdmin usage

You can integrate ReactPage in any other react application as its just a form field.
But we found integration in [ReactAdmin](https://marmelab.com/react-admin/) in particular useful
as it uses MaterialUI as well.

We provide a small helper package to integrate ReactPage in ReactAdmin:

`yarn add @react-page/react-admin`

### Usage

`RaReactPageInput` is an Input for ReactAdmin that shows a ReactPageEditor. It's value is a json object,
so make sure that your data-provider handles it properly. In the following example
we assume you have some kind of Blog. One BlogPost would have a `title` as a string and `content` for rich ReactPage content:

```tsx
import { RaReactPageInput } from '@react-page/react-admin';

// in your edit or create component:

const PostEdit = (props) => (
  <Edit title="Edit a Post" {...props}>
    <SimpleForm label="summary">
      <TextInput source="title" />
      <RaReactPageInput // <---
        source="content" // <-- the fieldname on the resource.
        label="Content"
        cellPlugins={cellPlugins}
        lang="en"
        // ... any other Editor prop
      />
    </SimpleForm>
  </Edit>
);
```

That's it!

### Using ReactAdmin resources in CellPlugins

The real power comes from using ReadAdmin resources _inside_ of ReactPage.
E.g. consider an Online Shop wich writes blog posts about their latest products.

The authors therefore wish to add a "Featured Products" component anywhere in their blog posts.

Let's assume that you already have `Product` and `Post` as resources in ReactAdmin.
You have added ReactPage as input for `Post.content` with `RaReactPageInput` as shown above.

We further assume that you have a `ProductTeasers` component that shows Products for an array of product ids.
This Component will be used for the Frontend as well.

Now we create a `CellPlugin` that allows the author to select products from ReactAdmin:

```tsx
import { RaSelectReferenceInputField } from '@react-page/react-admin';

const ProductIdSelector = (props) => (
  <RaSelectReferenceInputField
    {...props}
    optionText="title"
    reference="products" // <-- the name of our ReactAdmin resource
    label="Product"
  />
);

const recommendedProductsCellPlugin: CellPlugin<{
  productIds: string[];
  title: string;
}> = {
  id: 'recommendedProducts',
  title: 'Recommended Products',
  // render the data as usual
  Renderer: (props) => (
    <div>
      <h3>{props.data.title}</h3>
      <ProductTeasers productIds={props.data.productIds} />
    </div>
  ),
  version: 1,
  controls: {
    type: 'autoform',
    columnCount: 1,
    schema: {
      required: ['title', 'productIds'],
      properties: {
        title: {
          type: 'string',
          default: 'Our recommended products',
        },
        productIds: {
          type: 'array',
          items: {
            type: 'string',
            uniforms: {
              component: ProductIdSelector,
            },
          },
        },
      },
    },
  },
};
```

That's it!

### Using ReactAdmin resources in the slate CellPlugin

You can use ReactAdmin resources in slate as well. A common use case is to create frontend links to resources.
E.g. you want to create links to product detail pages. It works identical to the approach above.

See examples/reactadmin for an example
