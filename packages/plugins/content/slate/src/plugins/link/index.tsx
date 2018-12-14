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
import LinkIcon from '@material-ui/icons/Link';
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { ToolbarButton } from '../../helpers';
import Plugin, { PluginButtonProps } from '../Plugin';
import Link from './node';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Data, Inline } from 'slate';
import { ThemeProvider } from 'ory-editor-ui';

export const A = 'LINK/LINK';

export interface LinkButtonState {
  open: boolean;
  href: string;
  title: string;
  hadLinks: boolean;
  wasExpanded: boolean;
}

class LinkButton extends React.Component<PluginButtonProps, LinkButtonState> {
  state = {
    open: false,
    href: '',
    title: '',
    hadLinks: false,
    wasExpanded: false,
  };

  input: HTMLDivElement;

  onRef = (component: HTMLDivElement) => {
    if (!component && true) {
      return null;
    }

    const e = component.querySelector('input');
    if (e) {
      e.focus();
    }
  }

  onClick = e => {
    const { editorState, onChange } = this.props;
    e.preventDefault();

    const hasLinks = editorState.inlines.some(
      (inline: Inline) => inline.type === A
    );

    if (hasLinks) {
      const newState = editorState.change().unwrapInline(A).value;
      onChange({ value: newState });
    } else if (editorState.selection.isExpanded) {
      this.setState({
        open: true,
        wasExpanded: editorState.selection.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks,
      });
    } else {
      this.setState({
        open: true,
        wasExpanded: editorState.selection.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks,
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });

    const newState = this.props.editorState.change().focus().value;
    window.setTimeout(() => this.props.onChange({ value: newState }), 1);
  }

  handleSubmit = () => {
    this.setState({ open: false });

    if (!this.state.href) {
      this.handleClose();
      return;
    }

    if (this.state.wasExpanded) {
      const _newState = this.props.editorState
        .change()
        .focus()
        .wrapInline({
          type: A,
          data: { href: this.state.href },
        })
        .collapseToEnd().value;

      window.setTimeout(() => this.props.onChange({ value: _newState }), 1);
      // window.setTimeout(() => this.props.focus(), 100);
      return;
    }

    if (!this.state.title) {
      this.handleClose();
      return;
    }

    const newState = this.props.editorState
      .change()
      .insertText(this.state.title)
      .extend(-this.state.title.length)
      .wrapInline({
        type: A,
        data: { href: this.state.href },
      })
      .collapseToEnd()
      .focus().value;

    this.props.onChange({ value: newState });
    // window.setTimeout(() => this.props.focus(), 100);
  }

  onHrefChange = e => {
    this.setState({ href: e.target.value });
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  }

  render() {
    const actions = (
      <React.Fragment>
        <Button
          variant="flat"
          color="primary"
          onClick={this.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="flat"
          color="primary"
          onClick={this.handleSubmit}
        >
          Ok
        </Button>
      </React.Fragment>
    );
    const { editorState } = this.props;

    const hasLinks = editorState.inlines.some(
      (inline: Inline) => inline.type === A
    );
    return (
      <ThemeProvider>
        <span>
          <ToolbarButton
            onClick={this.onClick}
            isActive={hasLinks}
            icon={<LinkIcon />}
          />
          <span>
            <Dialog
              className="ory-prevent-blur"
              title="Create a link"
              // modal={false}
              open={this.state.open}
            >
              <DialogTitle id="confirmation-dialog-title">
                Create a link
              </DialogTitle>
              <DialogContent>
                {this.state.wasExpanded ? null : (
                  <div>
                    <TextField
                      placeholder="Link title"
                      onChange={this.onTitleChange}
                      value={this.state.title}
                    />
                  </div>
                )}
                <div ref={this.onRef}>
                  <TextField
                    placeholder="http://example.com/my/link.html"
                    onChange={this.onHrefChange}
                    value={this.state.href}
                  />
                </div>
              </DialogContent>
              <DialogActions>{actions}</DialogActions>
            </Dialog>
          </span>
        </span>
      </ThemeProvider>
    );
  }
}

export default class LinkPlugin extends Plugin {
  name = 'link';

  schema = {
    nodes: { [A]: Link },
  };

  hoverButtons = [LinkButton];
  toolbarButtons = [LinkButton];

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'a':
        return {
          object: 'inline',
          type: A,
          nodes: next(el.childNodes),
          data: Data.create({
            href: (
              el.attrs.find(({ name }) => name === 'href') || {
                value: '',
              }
            ).value,
          }),
        };
      default:
        return;
    }
  }

  serialize = (
    // tslint:disable-next-line:no-any
    object: { type: string; object: string; data: any },
    // tslint:disable-next-line:no-any
    children: any[]
  ) => {
    if (object.object !== 'inline') {
      return;
    }
    switch (object.type) {
      case A:
        return <a href={object.data.get('href')}>{children}</a>;
      default:
        return;
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case A: {
        return <Link {...props} />;
      }
      default:
        return;
    }
  }
}
