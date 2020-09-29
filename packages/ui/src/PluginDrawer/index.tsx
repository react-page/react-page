import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import {
  connect,
  ContentPlugin,
  Editor,
  LayoutPlugin,
  Plugin,
  sanitizeInitialChildren,
  Selectors,
  useEditor,
} from '@react-page/core';
import * as React from 'react';
import { Portal } from 'react-portal';
import { createStructuredSelector } from 'reselect';
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
  isInsertMode: boolean;
  editor: Editor;
  translations?: Translations;
};

interface RawState {
  isSearching: boolean;
  searchText: string;
}

class Raw extends React.Component<Props, RawState> {
  static defaultProps = {
    translations: defaultTranslations,
  };

  input: HTMLInputElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      isSearching: false,
      searchText: '',
    };

    this.onSearch = this.onSearch.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidUpdate() {
    const input = this.input;
    if (input && this.props.isInsertMode && input instanceof HTMLElement) {
      setTimeout(() => {
        const e = input.querySelector('input');
        if (e) {
          e.focus();
        }
      }, 100);
    }
  }

  onRef = (component) => {
    this.input = component;
  };

  onSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      this.setState({
        isSearching: target.value.length > 0,
        searchText: target.value,
      });
    }
  };

  searchFilter(plugin: Plugin) {
    return (
      plugin &&
      plugin.name &&
      !plugin.hideInMenu &&
      (plugin.name
        .toLowerCase()
        .startsWith(this.state.searchText.toLowerCase()) ||
        (plugin.description &&
          plugin.description
            .toLowerCase()
            .startsWith(this.state.searchText.toLowerCase())) ||
        (plugin.text &&
          plugin.text
            .toLowerCase()
            .startsWith(this.state.searchText.toLowerCase())))
    );
  }

  render() {
    const {
      editor: { plugins },
    } = this.props;
    const content = plugins.plugins.content.filter(this.searchFilter);
    const layout = plugins.plugins.layout.filter(this.searchFilter);

    return (
      <Portal>
        <Drawer
          variant="persistent"
          className="ory-plugin-drawer"
          open={this.props.isInsertMode}
          PaperProps={{
            style: {
              width: 320,
            },
          }}
        >
          <List
            subheader={
              <ListSubheader>
                {this.props.translations.insertPlugin}
              </ListSubheader>
            }
          >
            <ListItem>
              <TextField
                inputRef={this.onRef}
                placeholder={this.props.translations.searchPlaceholder}
                fullWidth={true}
                onChange={this.onSearch}
              />
            </ListItem>
            {layout.length + content.length === 0 && (
              <ListSubheader>
                {this.props.translations.noPluginFoundContent}
              </ListSubheader>
            )}
          </List>
          {content.length > 0 && (
            <List
              subheader={
                <ListSubheader>
                  {this.props.translations.contentPlugins}
                </ListSubheader>
              }
            >
              {content.map((plugin: ContentPlugin, k: number) => {
                const initialState = plugin.createInitialState();

                return (
                  <Item
                    translations={this.props.translations}
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
                <ListSubheader>
                  {this.props.translations.layoutPlugins}
                </ListSubheader>
              }
            >
              {layout.map((plugin: LayoutPlugin, k: number) => {
                const initialState = plugin.createInitialState();

                const children = sanitizeInitialChildren(
                  plugin.createInitialChildren()
                );

                return (
                  <Item
                    translations={this.props.translations}
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
  }
}

const mapStateToProps = createStructuredSelector({
  isInsertMode: Selectors.Display.isInsertMode,
});

const Decorated = connect(mapStateToProps)(Raw);

const Toolbar: React.SFC = () => {
  const editor = useEditor();
  return <Decorated editor={editor} />;
};

export default React.memo(Toolbar);
