import { Paper } from '@material-ui/core';
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
    <Paper
      elevation={2}
      style={{
        opacity: 0.9,
        position: 'fixed',
        right: '10vw',
        maxWidth: '30vw',
        top: '10vw',
        backgroundColor: 'white',
        padding: 20,
        zIndex: 50,
      }}
    >
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
    </Paper>
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
  const [hover, setHover] = React.useState(false);
  return (
    <Draggable insert={insert}>
      <div
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
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
          {hover ? <Preview plugin={plugin} /> : null}
        </ListItem>
      </div>
    </Draggable>
  );
};

export default Item;
