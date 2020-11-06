import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {
  CellPlugin,
  useInsertNew,
  useDisplayModeReferenceNodeId,
  useLang,
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

const Preview: React.FC<{ plugin: CellPlugin }> = ({ plugin }) => {
  const Component = plugin.Component;
  const lang = useLang();
  const data = plugin.createInitialData?.({}) ?? {};
  return (
    <div>
      <Component
        pluginConfig={plugin}
        isPreviewMode
        isEditMode={false}
        onChange={() => null}
        readOnly
        focused={false}
        state={data}
        nodeId={null}
        lang={lang}
        data={data}
      ></Component>
    </div>
  );
};

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
        <Preview plugin={plugin} />
      </ListItem>
    </Draggable>
  );
};

export default Item;
