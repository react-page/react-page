import * as React from 'react';
import { DividerRendererProps } from '../types/renderer';

const DividerHtmlRenderer: React.SFC<DividerRendererProps> = () => {
  return <hr className="ory-plugins-content-divider" />;
};

export default DividerHtmlRenderer;
