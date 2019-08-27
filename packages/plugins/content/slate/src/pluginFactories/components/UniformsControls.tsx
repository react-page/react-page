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

import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { SlatePluginControls } from '../../types/slatePluginDefinitions';
import { makeUniformsSchema } from '@react-page/create-plugin-materialui';
import { AutoForm, AutoFields } from 'uniforms-material';

import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

function Controls<T>(props: SlatePluginControls<T>) {
  const [data, setData] = useState();
  const [text, setText] = useState(null);

  useEffect(
    () => {
      // update data if reopens
      if (props.open) {
        console.log(props.data);
        setData(props.data);
      }
    },
    [props.open]
  );

  const onCancel = () => {
    console.log('on cancel');
    props.close();
    props.editor.focus();
  };

  const onSubmit = useCallback(
    () => {
      console.log('on submit', data);
      if (props.shouldInsertWithText) {
        props.addWithText(text, data);
      } else {
        props.add(data);
      }
      props.close();
      props.editor.focus();
    },
    [props.shouldInsertWithText, data, text]
  );

  const onRemove = () => {
    props.remove();
    props.close();
  };

  return (
    <Dialog className="ory-prevent-blur" open={props.open}>
      <DialogContent>
        {!props.shouldInsertWithText ? null : (
          <div>
            <TextField
              placeholder={props.translations.linkPlugin!.linkTitlePlaceholder}
              onChange={e => setText(e.target.value)}
              value={text}
            />
          </div>
        )}

        <AutoForm
          model={data}
          autosave={true}
          schema={makeUniformsSchema<T>(props.schema)}
          onSubmit={m => {
            console.log('autoform onSubmit', m);
            setData(m);
          }}
        >
          <AutoFields />
        </AutoForm>
      </DialogContent>
      <DialogActions>
        {props.isActive ? (
          <Button variant="text" color="primary" onClick={onRemove}>
            {props.removeLabel || 'Remove'}
          </Button>
        ) : null}
        <Button variant="text" color="primary" onClick={onCancel}>
          {props.cancelLabel || 'Cancel'}
        </Button>
        <Button variant="text" color="primary" onClick={onSubmit}>
          {props.submitLabel || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Controls;
