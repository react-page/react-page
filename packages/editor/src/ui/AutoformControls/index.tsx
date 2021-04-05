import React, { Fragment, useEffect, useMemo } from 'react';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import { useIsSmallScreen } from '../../core/components/hooks';
import lazyLoad from '../../core/helper/lazyLoad';

import {
  AutoformControlsDef,
  CellPluginComponentProps,
  JsonSchema,
} from '../../core/types';
import makeUniformsSchema from './makeUniformsSchema';

export const AutoForm = lazyLoad(() =>
  import('uniforms-material').then((c) => c.AutoForm)
);
export const AutoFields = lazyLoad(() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import('uniforms-material').then((c) => c.AutoFields as any)
) as React.FC<{
  element?: React.ReactNode;
  fields?: string[];
  omitFields?: string[];
}>;
const getDefaultValue = function (
  bridge: JSONSchemaBridge
): { [key: string]: unknown } {
  return bridge.getSubfields(null).reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: bridge.getInitialValue(fieldName),
    }),
    {}
  );
};

type Props<T> = CellPluginComponentProps<T> & AutoformControlsDef<T>;
export function AutoformControls<T extends Record<string, unknown> | unknown>({
  onChange,
  data,
  schema,
  columnCount = 2,
}: Props<T>) {
  const bridge = useMemo(() => makeUniformsSchema<T>(schema as JsonSchema<T>), [
    schema,
  ]);
  useEffect(() => {
    const newDefaultData = {
      ...getDefaultValue(bridge),
      ...(data ?? {}),
    };
    onChange(newDefaultData);
  }, [bridge]);
  const isSmall = useIsSmallScreen();
  return (
    <AutoForm model={data} autosave={true} schema={bridge} onSubmit={onChange}>
      <div
        style={{
          columnCount: isSmall ? 1 : columnCount,
          columnRule: '1px solid #E0E0E0',
          columnGap: 48,
        }}
      >
        <AutoFields element={Fragment} />
      </div>
    </AutoForm>
  );
}
