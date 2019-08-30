import React, { useState, useEffect, useCallback, useRef } from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { SlatePluginControls } from '../../types/slatePluginDefinitions';
import { makeUniformsSchema } from '@react-page/create-plugin-materialui';
import { AutoForm, AutoFields } from 'uniforms-material';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

function Controls<T>(props: SlatePluginControls<T>) {
  const uniformsSchema = makeUniformsSchema<T>(props.schema);

  // tslint:disable-next-line:no-any
  const formRef = useRef<any>();

  const [text, setText] = useState(null);

  const onCancel = () => {
    props.close();
    props.editor.focus();
  };

  const onSubmit = useCallback(
    data => {
      if (props.shouldInsertWithText) {
        props.addWithText(text, data);
      } else {
        props.add(data);
      }
      props.close();
      props.editor.focus();
    },
    [props.shouldInsertWithText, text]
  );

  const submitForm = useCallback(
    () => {
      if (formRef.current) {
        formRef.current.submit();
      }
    },
    [formRef.current]
  );

  const onRemove = () => {
    props.remove();
    props.close();
  };

  return (
    <Dialog
      PaperProps={{ style: { minWidth: 300 } }}
      className="ory-prevent-blur"
      open={props.open}
    >
      <DialogContent>
        {!props.shouldInsertWithText ? null : (
          <div>
            <TextField
              placeholder={'Text'}
              onChange={e => setText(e.target.value)}
              value={text}
            />
          </div>
        )}

        <AutoForm
          ref={formRef}
          model={props.data}
          schema={uniformsSchema}
          onSubmit={onSubmit}
        >
          <AutoFields />
        </AutoForm>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={onCancel}
          style={{ marginRight: 'auto' }}
        >
          {props.cancelLabel || 'Cancel'}
        </Button>
        {props.isActive ? (
          <Button variant="contained" color="secondary" onClick={onRemove}>
            {props.removeLabel || 'Remove'}
            <DeleteIcon style={{ marginLeft: 10 }} />
          </Button>
        ) : null}

        <Button variant="contained" color="primary" onClick={submitForm}>
          {props.submitLabel || 'Ok'}
          <DoneIcon style={{ marginLeft: 10 }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Controls;
