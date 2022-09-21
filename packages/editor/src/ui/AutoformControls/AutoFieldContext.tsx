import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { AutoField } from '../uniform-mui';

const AutofieldContextProvider: FC<PropsWithChildren> = ({ children }) => (
  <AutoField.componentDetectorContext.Provider
    value={(props, uniforms) => {
      const show = props.showIf?.(uniforms.model) ?? true;
      if (!show) return () => null;

      // see https://github.com/react-page/react-page/issues/1187
      // we remap props.component to props._customComponent to avoid the underlying issue in uniforms
      if (props._customComponent) {
        return props._customComponent;
      }
      return AutoField.defaultComponentDetector(props, uniforms);
    }}
  >
    {children}
  </AutoField.componentDetectorContext.Provider>
);

export default AutofieldContextProvider;
