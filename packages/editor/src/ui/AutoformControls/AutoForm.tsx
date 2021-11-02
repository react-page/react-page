/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import type { AutoFieldProps, AutoFormProps } from 'uniforms';
import { AutoForm } from 'uniforms-material';
import AutofieldContextProvider from './AutoFieldContext';

type OptionalFields =
  | 'autosaveDelay'
  | 'error'
  | 'label'
  | 'noValidate'
  | 'onValidate'
  | 'validate'
  | 'autosave';
type Props = Omit<AutoFormProps<unknown>, OptionalFields> &
  Partial<AutoFormProps<unknown>>;
export default forwardRef((props: Props, ref) => (
  <AutofieldContextProvider>
    <AutoForm {...props} ref={ref as any} />
  </AutofieldContextProvider>
));
