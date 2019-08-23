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

/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { FormControlLabel } from '@material-ui/core';
import { SlatePluginControls } from '../../types/slatePluginDefinitions';
import { LinkData } from '.';

export interface LinkControlsState {
  href: string;
  title: string;
  openInNewWindow: boolean;
}
export interface Props {
  open: boolean;
  close: () => void;
}

class Controls extends React.Component<
  SlatePluginControls<LinkData>,
  LinkControlsState
> {
  input: HTMLDivElement;
  constructor(props: SlatePluginControls<LinkData>) {
    super(props);
    this.state = {
      href: props.data.href,
      title: '',
      openInNewWindow: props.data.openInNewWindow,
    };
  }

  componentDidUpdate(oldProps: SlatePluginControls<LinkData>) {
    if (this.props.open !== oldProps.open) {
      this.setState({
        href: this.props.data.href,
        openInNewWindow: this.props.data.openInNewWindow,
      });
    }
  }

  onRef = (component: HTMLDivElement) => {
    if (!component && true) {
      return null;
    }

    const e = component.querySelector('input');
    if (e) {
      e.focus();
    }
  }

  handleClose = () => {
    this.props.close();
    this.props.editor.focus();
  }

  handleSubmit = () => {
    this.props.close();

    if (!this.state.href) {
      this.props.remove();
      return;
    }

    const data = {
      href: this.state.href,
      openInNewWindow: this.state.openInNewWindow,
    };

    if (this.props.shouldInsertWithText) {
      // no text is selected. so we need a title
      if (!this.state.title) {
        this.handleClose();
        return;
      }
      this.props.addWithText(this.state.title, data);
    } else {
      this.props.add(data);
    }
  }

  onHrefChange = e => {
    this.setState({ href: e.target.value });
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  }

  onOpenInNewWindowChange = (e, checked) => {
    this.setState({ openInNewWindow: checked });
  }

  render() {
    const actions = (
      <React.Fragment>
        <Button variant="text" color="primary" onClick={this.handleClose}>
          {this.props.translations.linkPlugin!.cancel}
        </Button>
        <Button variant="text" color="primary" onClick={this.handleSubmit}>
          {this.props.translations.linkPlugin!.ok}
        </Button>
      </React.Fragment>
    );

    return (
      <Dialog
        className="ory-prevent-blur"
        title={this.props.translations.linkPlugin!.createLink}
        // modal={false}
        open={this.props.open}
      >
        <DialogTitle id="confirmation-dialog-title">
          {this.props.translations.linkPlugin!.createLink}
        </DialogTitle>
        <DialogContent>
          {!this.props.shouldInsertWithText ? null : (
            <div>
              <TextField
                placeholder={
                  this.props.translations.linkPlugin!.linkTitlePlaceholder
                }
                onChange={this.onTitleChange}
                value={this.state.title}
              />
            </div>
          )}
          <div ref={this.onRef}>
            <TextField
              placeholder={
                this.props.translations.linkPlugin!.linkHrefPlaceholder
              }
              onChange={this.onHrefChange}
              value={this.state.href}
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.onOpenInNewWindowChange}
                value={this.state.openInNewWindow}
              />
            }
            label={this.props.translations.linkPlugin!.linkOpenInNewWindowLabel}
          />
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    );
  }
}

export default Controls;
