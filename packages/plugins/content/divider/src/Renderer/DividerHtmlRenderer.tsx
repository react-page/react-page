import * as React from 'react';
import { DividerRendererProps } from '../types/renderer';

const DividerHtmlRenderer: React.SFC<DividerRendererProps> = () => {
  return <hr className="react-page-plugins-content-divider" />;
};

export default DividerHtmlRenderer;
