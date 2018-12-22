import * as React from 'react';
import { DividerControlsProps } from '../types/controls';

const DividerDefaultControls: React.SFC<DividerControlsProps> = props => {
    return (
        <props.Renderer {...props}/>
    );
};

export default DividerDefaultControls;