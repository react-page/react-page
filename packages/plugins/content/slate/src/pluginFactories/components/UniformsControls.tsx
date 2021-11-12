import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import type { JsonSchema } from '@react-page/editor';
import { makeUniformsSchema, AutoForm, AutoFields } from '@react-page/editor';
import React, { useCallback, useRef, useState } from 'react';
import type { Data } from '../../types';

import type { SlatePluginControls } from '../../types/slatePluginDefinitions';

function Controls<T extends Data>(
  props: SlatePluginControls<T> & {
    schema?: JsonSchema<T>;
  }
) {
  const uniformsSchema = props.schema
    ? makeUniformsSchema<T>(props.schema)
    : null;

  const hasSchema = Boolean(props.schema);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>();

  const [text, setText] = useState<string | null>(null);

  const onCancel = () => {
    props.close();
  };

  const saveAndCloseWithData = useCallback(
    (data) => {
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

  const onOkClick = useCallback(() => {
    if (uniformsSchema) {
      submitForm();
    } else {
      saveAndCloseWithData({});
    }
  }, [submitForm, saveAndCloseWithData, hasSchema]);
  const onRemove = () => {
    props.remove();
    props.close();
  };

  return (
    <Dialog
      disableEnforceFocus={true}
      PaperProps={{
        style: { minWidth: 300 },
      }}
      open={props.open}
    >
      <DialogContent>
        {!props.shouldInsertWithText ? null : (
          <div>
            <TextField
              autoFocus={true}
              placeholder={'Text'}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        )}

        {hasSchema && uniformsSchema ? (
          <AutoForm
            ref={formRef}
            model={props.data as any}
            schema={uniformsSchema}
            onSubmit={saveAndCloseWithData}
          >
            <AutoFields />
          </AutoForm>
        ) : null}
      </DialogContent>
      {hasSchema ? (
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

          <Button variant="contained" color="primary" onClick={onOkClick}>
            {props.submitLabel || 'Ok'}
            <DoneIcon style={{ marginLeft: 10 }} />
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}

export default Controls;
