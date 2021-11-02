import React from 'react';
import { AutoField } from 'uniforms-material';

const AutofieldContextProvider: React.FC = ({ children }) => (
  <AutoField.componentDetectorContext.Provider
    value={(props, uniforms) => {
      const show = props.showIf?.(uniforms.model) ?? true;

      return show
        ? AutoField.defaultComponentDetector(props, uniforms)
        : () => null;
    }}
  >
    {children}
  </AutoField.componentDetectorContext.Provider>
);

export default AutofieldContextProvider;
