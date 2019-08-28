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
        setData(props.data);
      }
    },
    [props.open]
  );

  const onCancel = () => {
    props.close();
    props.editor.focus();
  };

  const onSubmit = useCallback(
    () => {
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
