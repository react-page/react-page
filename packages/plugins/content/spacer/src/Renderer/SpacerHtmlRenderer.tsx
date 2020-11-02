import * as React from 'react';
import { SpacerHtmlRendererProps } from '../types/renderer';
import { defaultSpacerState } from './../default/state';

const SpacerHtmlRenderer: React.SFC<SpacerHtmlRendererProps> = ({
  data = defaultSpacerState,
}) => {
  return <div style={{ height: `${(data?.height || 0).toString()}px` }} />;
};

export default SpacerHtmlRenderer;
