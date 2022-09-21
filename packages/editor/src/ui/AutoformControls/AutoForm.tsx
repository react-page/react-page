/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsWithChildren, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import type { AutoFormProps } from 'uniforms';
import { AutoForm } from 'uniforms';
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

export default forwardRef<any, PropsWithChildren<Props>>(
  (props: Props, ref) => (
    <AutofieldContextProvider>
      <AutoForm {...props} ref={ref as any} />
    </AutofieldContextProvider>
  )
);
