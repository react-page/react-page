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

import {
  SlatePluginDefinition,
  PluginButtonProps
} from '../../types/slatePluginDefinitions';

import ToolbarButton from './ToolbarButton';
import SlateHelpers from '../utils/SlateHelpers';
import UniformsControls from './UniformsControls';

export interface PluginState {
  showControls: boolean;
}

type Props<T extends {}> = {
  config: SlatePluginDefinition<T>;
  isActive: boolean;
} & PluginButtonProps;
class PluginButton<T = {}> extends React.Component<Props<T>, PluginState> {
  state = {
    showControls: false,
  };
  slateHelpers: SlateHelpers<T>;
  constructor(props: Props<T>) {
    super(props);
    this.slateHelpers = new SlateHelpers(this.props.editor, this.props.config);
  }
  textIsSelected = () => {
    return this.props.editorState.selection.isExpanded;
  }
  addWithText = (text: string, data?: T) => {
    this.props.editor.insertText(text).moveFocusBackward(text.length);
    this.add(data);
  }

  add = (passedData?: T) => {
    this.slateHelpers.add(passedData);
  }
  remove = () => {
    this.slateHelpers.remove();
  }

  getCurrentNode = () => {
    return this.slateHelpers.getCurrentNode();
  }

  isActive = () => {
    return this.slateHelpers.isActive();
  }
  isDisabled = () => {
    const { config, editor } = this.props;
    if (!editor) {
      return true;
    }
    return config.isDisabled ? config.isDisabled(editor) : false;
  }

  getData = () => {
    const currentNode = this.getCurrentNode();

    return currentNode && currentNode.data ? currentNode.data.toJS() : {};
  }

  hasControls = () => {
    return (
      Boolean(this.props.config.Controls) || Boolean(this.props.config.schema)
    );
  }

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    console.log('on click', this.hasControls(), this.state.showControls);
    console.log(this.getData());
    if (this.hasControls()) {
      this.setState({ showControls: !this.state.showControls });
    } else {
      if (this.isActive()) {
        this.remove();
      } else {
        this.add();
      }
    }
  }

  close = () => {
    console.log('close');
    this.setState({ showControls: false });
  }

  render() {
    const { Controls: PassedControls } = this.props.config;
    const Controls = PassedControls || UniformsControls;
    return (
      <>
        <ToolbarButton
          onClick={this.onClick}
          disabled={this.isDisabled()}
          isActive={this.isActive()}
          icon={
            this.props.config.icon ||
            (this.props.config.pluginType === 'component' &&
              this.props.config.deserialize.tagName)
          }
        />

        {this.hasControls() ? (
          <Controls
            schema={this.props.config.schema}
            close={this.close}
            open={this.state.showControls}
            add={this.add}
            remove={this.remove}
            isActive={this.isActive()}
            shouldInsertWithText={
              this.props.config.pluginType === 'component' &&
              this.props.config.object === 'mark' &&
              !this.textIsSelected() &&
              !this.isActive()
            }
            addWithText={this.addWithText}
            data={this.getData()}
            {...this.props}
          />
        ) : null}
      </>
    );
  }
}

export default PluginButton;
