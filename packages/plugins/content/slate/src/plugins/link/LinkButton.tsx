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
import { ToolbarButton } from '../../helpers';
import { PluginButtonProps } from '../Plugin';

import Controls from './Controls';
import { Inline } from 'slate';
import { ThemeProvider } from '@react-page/ui';

const A = 'LINK/LINK';
export interface LinkButtonState {
  open: boolean;
}

class LinkButton extends React.Component<PluginButtonProps, LinkButtonState> {
  state = {
    open: false,
  };

  removeLink() {
    const { editor } = this.props;
    editor.unwrapInline(A);
  }

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    const { editorState } = this.props;
    e.preventDefault();

    const hasLinks = editorState.inlines.some(
      (inline: Inline) => inline.type === A
    );

    if (hasLinks) {
      this.removeLink();
    } else {
      this.setState({ open: true });
    }
  }

  close = () => {
    this.setState({ open: false });
  }

  render() {
    const { editorState } = this.props;

    const hasLinks = editorState.inlines.some(
      (inline: Inline) => inline.type === A
    );
    return (
      <ThemeProvider>
        <>
          <ToolbarButton
            onClick={this.onClick}
            isActive={hasLinks}
            icon={<LinkIcon />}
          />

          <Controls close={this.close} open={this.state.open} {...this.props} />
        </>
      </ThemeProvider>
    );
  }
}

export default LinkButton;
