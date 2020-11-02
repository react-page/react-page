import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {
  CellPlugin,
  useInsertNew,
  useDisplayModeReferenceNodeId,
} from '@react-page/core';

import * as React from 'react';
import { Translations } from '..';
import draggable from '../Draggable/index';

interface ItemProps {
  plugin: CellPlugin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: any;
  translations: Translations;
}

const Item: React.FC<ItemProps> = ({ plugin, insert, translations }) => {
  const title = plugin.title ?? plugin.text;
  if (!plugin.IconComponent && !title) {
    return null;
  }

  const referenceNodeId = useDisplayModeReferenceNodeId();
  const insertNew = useInsertNew();
  const insertIt = React.useCallback(
    () => insertNew(insert, referenceNodeId ?? null),
    [insertNew, referenceNodeId, insert]
  );

  const Draggable = draggable('cell');

  return (
    <Draggable insert={insert}>
      <ListItem
        title="Click to add or drag and drop it somwhere on your page!"
        className="ory-plugin-drawer-item"
        onClick={insertIt}
      >
        <Avatar
          children={plugin.IconComponent || title[0]}
          style={{
            marginRight: 16,
          }}
        />
        <ListItemText primary={title} secondary={plugin.description} />
      </ListItem>
    </Draggable>
  );
};

export default Item;
