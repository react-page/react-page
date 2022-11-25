import type { ListItemProps } from '@mui/material/ListItem';
import ListItemMaterial from '@mui/material/ListItem';
import type { ReactNode } from 'react';
import React from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';
import ListSortField from './ListSortField';

export type ListItemFieldProps = {
  children?: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  removeIcon?: ReactNode;
  value?: unknown;
};

function ListItem({
  children = <AutoField label={null} name="" />,
  dense = true,
  disableGutters,
  divider,
  removeIcon,
}: ListItemFieldProps) {
  return (
    <ListItemMaterial
      dense={dense}
      disableGutters={disableGutters}
      divider={divider}
    >
      <ListSortField name="" />
      {children}
      <ListDelField name="" icon={removeIcon} />
    </ListItemMaterial>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
