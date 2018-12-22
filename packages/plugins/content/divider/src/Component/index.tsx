import * as React from 'react';
import { DividerProps } from '../types/component';

const Divider: React.SFC<DividerProps> = props => {
  return <props.Controls {...props}/>;
};

export default Divider;
