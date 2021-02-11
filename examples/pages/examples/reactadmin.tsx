// The editor core
import { RaReactPageInput } from '@react-page/react-admin';
import dynamic from 'next/dynamic';
import fakeDataProvider from 'ra-data-fakerest';
import React from 'react';
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
} from 'react-admin';
import { cellPlugins } from '../../plugins/cellPlugins';
import { demo } from '../../sampleContents/demo';

// see https://github.com/marmelab/react-admin/issues/5896
const Admin = dynamic(() => import('react-admin').then((c) => c.Admin), {
  ssr: false,
});

const dataProvider = fakeDataProvider({
  posts: [
    { id: 0, title: 'Demo!', content: demo },
    { id: 1, title: 'Empty' },
  ],
});

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
  <Edit title="Edit a Page" {...props}>
    <SimpleForm label="summary">
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <RaReactPageInput
        source="content"
        label="Content"
        cellPlugins={cellPlugins}
      />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Edit a Page" {...props}>
    <SimpleForm label="summary">
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

const posts = {
  list: PostList,
  create: PostCreate,
  edit: PostEdit,
};

export default function ReactAdminExample() {
  return (
    <Admin dataProvider={dataProvider} title="Example Admin">
      <Resource name="posts" {...posts} />
    </Admin>
  );
}
