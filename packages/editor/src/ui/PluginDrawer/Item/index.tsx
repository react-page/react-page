import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import React from 'react';
import { Translations } from '..';
import {
  useDisplayModeReferenceNodeId,
  useInsertNew,
} from '../../../core/components/hooks';
import { CellPlugin, InsertNewCell } from '../../../core/types';
import Draggable from '../Draggable/index';

type ItemProps = {
  plugin: CellPlugin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: InsertNewCell;
  translations: Translations;
};

const Item: React.FC<ItemProps> = ({ plugin, insert }) => {
  const title = plugin.title ?? plugin.text;
  if (!plugin.icon && !title) {
    return null;
  }

  const referenceNodeId = useDisplayModeReferenceNodeId();
  const insertNew = useInsertNew();
  const insertIt = React.useCallback(
    () => insertNew(insert, referenceNodeId ?? null),
    [insertNew, referenceNodeId, insert]
  );

  return (
    <Draggable insert={insert}>
      <ListItem
        title="Click to add or drag and drop it somwhere on your page!"
        className="react-page-plugin-drawer-item"
        onClick={insertIt}
      >
        <Avatar
          children={plugin.icon || title[0]}
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
