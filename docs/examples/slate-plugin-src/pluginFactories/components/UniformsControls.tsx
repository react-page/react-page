import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import type { JsonSchema } from '@react-page/editor';
import { makeUniformsSchema, AutoForm, AutoFields } from '@react-page/editor';
import React, { useCallback, useRef, useState } from 'react';
import type { Data } from '../../types';

import type { SlatePluginControls } from '../../types/slatePluginDefinitions';
import { useEffect } from 'react';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
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
          <div style={{ marginBottom: '1em' }}>
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            model={props.data as any}
            schema={uniformsSchema}
            onSubmit={saveAndCloseWithData}
          >
            <AutoFields />
          </AutoForm>
        ) : null}
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
        {hasSchema ? (
          <Button variant="contained" color="primary" onClick={onOkClick}>
            {props.submitLabel || 'Ok'}
            <DoneIcon style={{ marginLeft: 10 }} />
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export default Controls;
