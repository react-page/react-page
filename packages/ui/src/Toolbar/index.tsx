/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { isInsertMode } from '@react-page/core/lib/selector/display';
import { createStructuredSelector } from 'reselect';
import { Editor } from '@react-page/core/lib';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import {
  LayoutPlugin,
  ContentPlugin
} from '@react-page/core/lib/service/plugin/classes';
import Item from './Item/index';
import Provider from '../Provider/index';
import { ProviderProps } from './../Provider/index';
import { Plugin } from '@react-page/core/lib/service/plugin/classes';

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

  onRef = component => {
    this.input = component;
  }

  onSearch: React.ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      this.setState({
        isSearching: target.value.length > 0,
        searchText: target.value,
      });
    }
  }

  searchFilter(plugin: Plugin) {
    return (
      plugin &&
      plugin.name &&
      plugin.name.toLowerCase().startsWith(this.state.searchText.toLowerCase())
    );
  }

  render() {
    const {
      editor: { plugins },
    } = this.props;
    const content = plugins.plugins.content.filter(this.searchFilter);
    const layout = plugins.plugins.layout.filter(this.searchFilter);

    return (
      <Drawer
        variant="persistent"
        className="ory-toolbar-drawer"
        open={this.props.isInsertMode}
      >
        <List subheader={<ListSubheader>{this.props.translations.insertPlugin}</ListSubheader>}>
          <ListItem>
            <TextField
              inputRef={this.onRef}
              placeholder={this.props.translations.searchPlaceholder}
              fullWidth={true}
              onChange={this.onSearch}
            />
          </ListItem>
          {layout.length + content.length === 0 && (
            <ListSubheader>{this.props.translations.noPluginFoundContent}</ListSubheader>
          )}
        </List>
        {content.length > 0 && (
          <List subheader={<ListSubheader>{this.props.translations.contentPlugins}</ListSubheader>}>
            {content.map((plugin: ContentPlugin, k: Number) => {
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
          <List subheader={<ListSubheader>{this.props.translations.layoutPlugins}</ListSubheader>}>
            {layout.map((plugin: LayoutPlugin, k: Number) => {
              const initialState = plugin.createInitialState();
              const children = plugin.createInitialChildren();

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
    );
  }
}

const mapStateToProps = createStructuredSelector({ isInsertMode });

const Decorated = connect(mapStateToProps)(Raw);

const Toolbar: React.SFC<ProviderProps> = props => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
);

export default Toolbar;
