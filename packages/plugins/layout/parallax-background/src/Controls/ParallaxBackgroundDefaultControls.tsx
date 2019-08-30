import * as React from 'react';
import { ParallaxBackgroundControlsProps } from '../types/controls';
import TextField from '@material-ui/core/TextField';
import { BottomToolbar } from '@react-page/ui';

const ParallaxBackgroundDefaultControls: React.SFC<
  ParallaxBackgroundControlsProps
> = props => {
  const {
    focused,
    state: { background = '', darken = 0.3 },
  } = props;
  return (
    <BottomToolbar open={focused}>
      <TextField
        placeholder="http://example.com/image.png"
        label="Image location (URL)"
        style={{ width: '256px' }}
        value={background}
        onChange={e => props.handleBackgroundPreviewChange(e.target.value)}
        onBlur={props.commitBackground}
      />
      <TextField
        placeholder="0.3"
        label="Darken level"
        style={{ width: '256px' }}
        value={darken}
        onChange={e => props.handleDarkenPreviewChange(e.target.value)}
        onBlur={props.commitDarken}
      />
    </BottomToolbar>
  );
};

export default ParallaxBackgroundDefaultControls;
