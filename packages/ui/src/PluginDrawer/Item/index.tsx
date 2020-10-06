import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { PluginConfig, useInsertCellAtTheEnd } from '@react-page/core';

import * as React from 'react';
import { Translations } from '..';
import draggable from '../Draggable/index';

interface ItemProps {
  plugin: PluginConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: any;
  translations: Translations;
}

const Item: React.FC<ItemProps> = ({ plugin, insert, translations }) => {
  if (!plugin.IconComponent && !plugin.text) {
    return null;
  }
  const insertAtEnd = useInsertCellAtTheEnd();
  const Draggable = draggable('cell');

  return (
    <Draggable insert={insert}>
      <ListItem
        title="Click to add or drag and drop it somwhere on your page!"
        className="ory-plugin-drawer-item"
        onClick={() => insertAtEnd(insert)}
      >
        <Avatar
          children={plugin.IconComponent || plugin.text[0]}
          style={{
            marginRight: 16,
          }}
        />
        <ListItemText primary={plugin.text} secondary={plugin.description} />
      </ListItem>
    </Draggable>
  );
};

export default Item;
