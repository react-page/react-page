import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Portal } from 'react-portal';
import {
  useIsInsertMode,
  useAllCellPlugins,
  useUiTranslator,
} from '../../core/components/hooks';
import { CellPlugin } from '../../core/types';
import Item from './Item/index';

export interface PluginDrawerLabels {
  noPluginFoundContent: string;
  searchPlaceholder: string;
  insertPlugin: string;
  dragMe: string;
}

const getPluginTitle = (plugin: CellPlugin) =>
  (plugin.title || plugin.text) ?? '';

export const PluginDrawer: React.FC = React.memo(() => {
  const defaultLabels: PluginDrawerLabels = {
    noPluginFoundContent: 'No plugins found',
    searchPlaceholder: 'Search cell plugins',
    insertPlugin: 'Add cells to content',
    dragMe: 'Drag me!',
  };

  const plugins = useAllCellPlugins();
  const { t } = useUiTranslator();
  const [searchText, setSearchText] = React.useState<string>('');
  const searchFilter = React.useCallback(
    (plugin: CellPlugin) => {
      const id = plugin.id;
      const title = getPluginTitle(plugin);
      return (
        plugin &&
        id &&
        !plugin.hideInMenu &&
        (id.toLowerCase().startsWith(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .startsWith(searchText?.toLowerCase())) ||
          (title && title.toLowerCase().startsWith(searchText?.toLowerCase())))
      );
    },
    [searchText]
  );

  const onSearch = React.useCallback(
    (e: React.ChangeEvent) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        setSearchText(target.value);
      }
    },
    [setSearchText]
  );
  const isInsertMode = useIsInsertMode();
  const inputRef = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    let handle;
    if (inputRef.current && isInsertMode) {
      handle = setTimeout(() => {
        const e = inputRef.current.querySelector('input');
        if (e) {
          e.focus();
        }
      }, 100);
    }

    return () => {
      clearTimeout(handle);
    };
  }, [inputRef.current, isInsertMode]);

  const filteredPlugins = plugins.filter(searchFilter);

  return (
    <Portal>
      <Drawer
        variant="persistent"
        className="react-page-plugin-drawer"
        open={isInsertMode}
        PaperProps={{
          style: {
            width: 320,
          },
        }}
      >
        <List
          subheader={
            <ListSubheader>{t(defaultLabels.insertPlugin)}</ListSubheader>
          }
        >
          <ListItem>
            <TextField
              inputRef={inputRef}
              placeholder={t(defaultLabels.searchPlaceholder)}
              fullWidth={true}
              onChange={onSearch}
            />
          </ListItem>
          {filteredPlugins.length === 0 && (
            <ListSubheader>
              {t(defaultLabels.noPluginFoundContent)}
            </ListSubheader>
          )}
        </List>
        {filteredPlugins.length > 0 && (
          <List>
            {filteredPlugins.map((plugin: CellPlugin, k: number) => {
              return (
                <Item
                  translations={defaultLabels}
                  plugin={plugin}
                  key={k.toString()}
                  insert={{
                    plugin: plugin.id,
                  }}
                />
              );
            })}
          </List>
        )}
      </Drawer>
    </Portal>
  );
});
