// The editor core
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { CellPlugin } from '@react-page/editor';
import slate, {
  DEFAULT_SLATE_PLUGIN_ID,
  pluginFactories,
} from '@react-page/plugins-slate';
import {
  RaReactPageInput,
  RaSelectReferenceInputField,
} from '@react-page/react-admin';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import fakeDataProvider from 'ra-data-fakerest';
import React, { useEffect, useState } from 'react';
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Resource,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  ImageField,
} from 'react-admin';
import { cellPlugins } from '../../plugins/cellPlugins';
import { demo } from '../../sampleContents/demo';
import { raAboutUs } from '../../sampleContents/raAboutUs';

// see https://github.com/marmelab/react-admin/issues/5896
const Admin = dynamic(() => import('react-admin').then((c) => c.Admin), {
  ssr: false,
});

// this is a fake dataprovider. Normally you woul use your own data-provider (rest, graphql, etc.)
const dataProvider = fakeDataProvider({
  posts: [
    { id: 'post1', title: 'About us', content: raAboutUs },
    { id: 'post2', title: 'An empty post' },
    { id: 'post3', title: 'Demo!', content: demo },
  ],
  products: [
    {
      id: 'product1',
      title: 'A Fancy Chair!',
      imageUrl: 'https://picsum.photos/seed/react-page/800/600',
      teaserText:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
      id: 'product2',
      title: 'Some miracelous table',
      imageUrl: 'https://picsum.photos/seed/react-page-is-awesome/800/600',
      teaserText:
        'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
    },
    {
      id: 'product3',
      title: 'Fantastic closet',
      imageUrl: 'https://picsum.photos/seed/react-admin-as-well/800/600',
      teaserText:
        'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
    },
  ],
});

/**
 * This is an example of a slate link plugin that uses react admin to select the target
 */
const PostIdSelector = (props) => (
  // pass the props
  <RaSelectReferenceInputField
    optionText="title"
    reference="posts"
    label="Post"
    {...props}
  />
);
const postLinkPlugin = pluginFactories.createComponentPlugin<{
  postId: string;
}>({
  icon: <span>Post</span>,
  type: 'postlink',
  object: 'mark',
  label: 'Post link',
  addHoverButton: true,
  addToolbarButton: true,
  controls: {
    type: 'autoform',
    schema: {
      required: ['postId'],
      type: 'object',
      properties: {
        postId: {
          type: 'string',
          uniforms: {
            // you should lazy load this
            component: PostIdSelector,
          },
        },
      },
    },
  },
  // this code here lives primarly in your frontend, you would create the link however you like
  // and you would probably read more data from your datasource
  // this is just a simple example. The link dofes actually not work in our example, but you should get the idea
  Component: (props) => (
    <Link href={'/posts/' + props.postId}>
      <a>{props.children}</a>
    </Link>
  ),
});

// let's add a custom slate plugin
const customSlate = slate((def) => ({
  ...def,
  plugins: {
    ...def.plugins,
    link: {
      ...def.plugins.link,
      postLink: postLinkPlugin,
    },
  },
}));

const ProductIdSelector = (props) => (
  // pass the props
  <RaSelectReferenceInputField
    {...props}
    optionText="title"
    reference="products"
    label="Product"
  />
);

const ProductTeaser: React.FC<{ productId: string }> = ({ productId }) => {
  // this component would live in your frontend
  // you won't load data from admin here, but from the public frontend api
  // for this example, we use the dataprovider, but in real-live-applications, that would not be the case
  const [product, setProduct] = useState(null);
  useEffect(() => {
    dataProvider
      .getOne('products', { id: productId })
      .then((r) => setProduct(r.data));
  }, [productId]);
  return product ? (
    <Card>
      <CardMedia
        image={product.imageUrl}
        title={product.title}
        style={{ height: 240 }}
      />
      <CardHeader title={product.title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.teaserText}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};
const recommendedProducts: CellPlugin<{
  productIds: string[];
  title: string;
}> = {
  id: 'recommendedProducts',
  title: 'Recommended Products',
  Renderer: (props) => (
    <div>
      <h3>{props.data.title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
        }}
      >
        {props.data.productIds?.map((id) => (
          <ProductTeaser productId={id} key={id} />
        ))}
      </div>
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
const ourCellPlugins = [
  customSlate,
  recommendedProducts,
  ...cellPlugins.filter((p) => p.id !== DEFAULT_SLATE_PLUGIN_ID),
];

const PostList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const PostEdit = (props) => (
  <Edit title="Edit a Post" {...props}>
    <SimpleForm label="summary">
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <RaReactPageInput
        source="content"
        label="Content"
        cellPlugins={ourCellPlugins}
      />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm label="summary">
      <TextInput source="id" />
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

const posts = {
  list: PostList,
  create: PostCreate,
  edit: PostEdit,
};

const ProductList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ImageField source="imageUrl" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const ProductEdit = (props) => (
  <Edit title="Edit a Product" {...props}>
    <SimpleForm label="summary">
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput multiline source="teaserText" />
      <TextInput source="imageUrl" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create title="Create a Product" {...props}>
    <SimpleForm label="summary">
      <TextInput source="id" />
      <TextInput source="title" />
      <TextInput multiline source="teaserText" />
      <TextInput source="imageUrl" />
    </SimpleForm>
  </Create>
);

const products = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
};

export default function ReactAdminExample() {
  return (
    <Admin dataProvider={dataProvider} title="Example Admin">
      <Resource name="posts" {...posts} />
      <Resource name="products" {...products} />
    </Admin>
  );
}
