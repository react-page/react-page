import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DragHandle from '@material-ui/icons/DragHandle';
import { Plugin } from '@react-page/core';

import * as React from 'react';
import { Translations } from '..';
import draggable from '../Draggable/index';
import { Tooltip } from '@material-ui/core';

interface ItemProps {
  plugin: Plugin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: any;
  translations: Translations;
}

const Item: React.FC<ItemProps> = ({ plugin, insert, translations }) => {
  if (!plugin.IconComponent && !plugin.text) {
    // logger.warn('Plugin text or plugin icon missing', plugin)
    return null;
  }
  const Draggable = draggable(plugin.name);

  // not using css modules here because they don't work with svg icons
  return (
    <ListItem className="ory-plugin-drawer-item">
      <Avatar
        children={plugin.IconComponent || plugin.text[0]}
        style={{
          marginRight: 16,
        }}
      />
      <ListItemText primary={plugin.text} secondary={plugin.description} />
      <span className="ory-plugin-drawer-item-drag-handle-button">
        <Draggable insert={insert}>
          <Tooltip title={translations.dragMe}>
            <DragHandle className="ory-plugin-drawer-item-drag-handle" />
          </Tooltip>
        </Draggable>
      </span>
    </ListItem>
  );
};

export default Item;
