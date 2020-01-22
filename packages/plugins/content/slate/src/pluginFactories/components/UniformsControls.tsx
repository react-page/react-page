import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeUniformsSchema } from '@react-page/create-plugin-materialui';
import React, { useCallback, useRef, useState } from 'react';
import {
  AutoFields as AutoFieldsOrg,
  AutoForm as AutoFormOrg
} from 'uniforms-material';
import { SlatePluginControls } from '../../types/slatePluginDefinitions';

// see https://github.com/vazco/uniforms/issues/617
// tslint:disable-next-line:no-any
const AutoForm: any = AutoFormOrg;
// tslint:disable-next-line:no-any
const AutoFields: any = AutoFieldsOrg;

function Controls<T>(props: SlatePluginControls<T>) {
  const uniformsSchema = makeUniformsSchema<T>(props.schema);

  // tslint:disable-next-line:no-any
  const formRef = useRef<any>();

  const [text, setText] = useState(null);

  const onCancel = () => {
    props.close();
  };

  const onSubmit = useCallback(
    data => {
      props.close();
      if (props.shouldInsertWithText) {
        props.add({ text, data });
      } else {
        props.add({ data });
      }
    },
    [props.shouldInsertWithText, text]
  );

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [formRef.current]);

  const onRemove = () => {
    props.remove();
    props.close();
  };

  return (
    <Dialog
      disableEnforceFocus={true}
      PaperProps={{ style: { minWidth: 300 } }}
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
