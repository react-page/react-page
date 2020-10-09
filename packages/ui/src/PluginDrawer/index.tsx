import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import {
  ContentPlugin,
  LayoutPlugin,
  PluginBase,
  sanitizeInitialChildren,
  useEditor,
  useIsInsertMode,
} from '@react-page/core';
import * as React from 'react';
import { Portal } from 'react-portal';
import Item from './Item/index';

export interface Translations {
  noPluginFoundContent: string | JSX.Element;
  searchPlaceholder: string;
  layoutPlugins: string | JSX.Element;
  contentPlugins: string | JSX.Element;
  insertPlugin: string | JSX.Element;
  dragMe: string;
}

const defaultTranslations: Translations = {
  noPluginFoundContent: 'No plugins found',
  searchPlaceholder: 'Search plugins',
  layoutPlugins: 'Layout plugins',
  contentPlugins: 'Content plugins',
  insertPlugin: 'Add plugin to content',
  dragMe: 'Drag me!',
};

type Props = {
  translations?: Translations;
};

const Toolbar: React.FC<Props> = ({ translations = defaultTranslations }) => {
  const editor = useEditor();
  const plugins = editor.plugins;

  const [searchText, setSearchText] = React.useState<string>('');
  const searchFilter = React.useCallback(
    (plugin: PluginBase) => {
      return (
        plugin &&
        plugin.name &&
        !plugin.hideInMenu &&
        (plugin.name.toLowerCase().startsWith(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .startsWith(searchText?.toLowerCase())) ||
          (plugin.text &&
            plugin.text.toLowerCase().startsWith(searchText?.toLowerCase())))
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

  const content = plugins.plugins.content.filter(searchFilter);
  const layout = plugins.plugins.layout.filter(searchFilter);

  return (
    <Portal>
      <Drawer
        variant="persistent"
        className="ory-plugin-drawer"
        open={isInsertMode}
        PaperProps={{
          style: {
            width: 320,
          },
        }}
      >
        <List
          subheader={<ListSubheader>{translations.insertPlugin}</ListSubheader>}
        >
          <ListItem>
            <TextField
              inputRef={inputRef}
              placeholder={translations.searchPlaceholder}
              fullWidth={true}
              onChange={onSearch}
            />
          </ListItem>
          {layout.length + content.length === 0 && (
            <ListSubheader>{translations.noPluginFoundContent}</ListSubheader>
          )}
        </List>
        {content.length > 0 && (
          <List
            subheader={
              <ListSubheader>{translations.contentPlugins}</ListSubheader>
            }
          >
            {content.map((plugin: ContentPlugin, k: number) => {
              const initialState = plugin.createInitialState?.() ?? {};

              return (
                <Item
                  translations={translations}
                  plugin={plugin}
                  key={k.toString()}
                  insert={{
                    content: {
                      plugin,
                      state: initialState,
                    },
                  }}
                />
              );
            })}
          </List>
        )}
        {layout.length > 0 && (
          <List
            subheader={
              <ListSubheader>{translations.layoutPlugins}</ListSubheader>
            }
          >
            {layout.map((plugin: LayoutPlugin, k: number) => {
              const initialState = plugin.createInitialState?.() ?? {};

              const children = sanitizeInitialChildren(
                plugin.createInitialChildren()
              );

              return (
                <Item
                  translations={translations}
                  plugin={plugin}
                  key={k.toString()}
                  insert={{
                    ...children,
                    layout: {
                      plugin,
                      state: initialState,
                    },
                  }}
                />
              );
            })}
          </List>
        )}
      </Drawer>
    </Portal>
  );
};

export default React.memo(Toolbar);
