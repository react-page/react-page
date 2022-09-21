import type { ListProps } from '@mui/material/List';
import ListMaterial from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import type { ReactNode } from 'react';
import React, { Children, cloneElement, isValidElement } from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    addIcon?: ReactNode;
    initialCount?: number;
    itemProps?: Record<string, any>;
  }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  return (
    <>
      <ListMaterial
        dense
        subheader={
          label ? (
            <ListSubheader disableSticky>{label}</ListSubheader>
          ) : undefined
        }
        {...filterDOMProps(props)}
      >
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)
              : child
          )
        )}
      </ListMaterial>
      <ListAddField icon={addIcon} initialCount={initialCount} name="$" />
    </>
  );
}

export default connectField<ListFieldProps>(List);
