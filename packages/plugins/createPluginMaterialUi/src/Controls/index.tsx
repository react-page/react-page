import { BottomToolbar } from '@react-page/ui';
import debounce from 'lodash.debounce';
import React, { Fragment, useCallback, useState } from 'react';
import {
  AutoFields as AutoFieldsOrg,
  AutoForm as AutoFormOrg
} from 'uniforms-material';
import { ControlProps, ControlsLayout } from '../types';
import makeUniformsSchema from '../utils/makeUniformsSchema';

// see https://github.com/vazco/uniforms/issues/617
// tslint:disable-next-line:no-any
const AutoForm: any = AutoFormOrg;
// tslint:disable-next-line:no-any
const AutoFields: any = AutoFieldsOrg;

const defaultControlsLayout: ControlsLayout = {
  columnCount: 2,
};
function Controls<T>(props: ControlProps<T>) {
  const saveDebounced = useCallback(
    debounce((m: T) => props.onChange(m), 1000),
    [props.onChange]
  );

  const [preview, setPreview] = useState();

  const onSubmit = (model: T) => {
    setPreview(model);
    saveDebounced(model);
  };

  const {
    focused,
    state,
    schema,
    controlsLayout = defaultControlsLayout,
    Renderer,
    remove,
  } = props;
  return (
    <>
      <Renderer {...props} state={preview || state} />

      <BottomToolbar
        open={focused}
        title={props.text}
        onDelete={remove}
        icon={props.IconComponent}
        {...props}
      >
        <div style={{ marginBottom: 24, maxHeight: '50vh', overflow: 'auto' }}>
          <AutoForm
            model={preview || state}
            autosave={true}
            schema={makeUniformsSchema<T>(schema)}
            onSubmit={onSubmit}
          >
            <div
              style={{
                columnCount: controlsLayout.columnCount || 2,
                columnRule: '1px solid #E0E0E0',
                columnGap: 48,
              }}
            >
              <AutoFields element={Fragment} />
            </div>
          </AutoForm>
        </div>
      </BottomToolbar>
    </>
  );
}

export default Controls;
