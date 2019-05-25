import * as React from 'react';
import { ParallaxBackgroundControlsProps } from 'src/types/controls';
import TextField from '@material-ui/core/TextField';
import { BottomToolbar } from '@react-page/ui';
import ThemeProvider, { darkTheme } from '@react-page/ui/lib/ThemeProvider';

const ParallaxBackgroundDefaultControls: React.SFC<
  ParallaxBackgroundControlsProps
> = props => {
  const {
    Renderer,
    focused,
    state: { background = '', darken = 0.3 },
  } = props;
  return (
    <>
      <Renderer {...props}/>
      <ThemeProvider theme={darkTheme}>
        <BottomToolbar open={focused} theme={darkTheme}>
          <TextField
            placeholder="http://example.com/image.png"
            label="Image location (URL)"
            style={{ width: '256px' }}
            value={background}
            onChange={(e) => props.handleBackgroundPreviewChange(e.target.value)}
            onBlur={props.commitBackground}
          />
          <TextField
            placeholder="0.3"
            label="Darken level"
            style={{ width: '256px' }}
            value={darken}
            onChange={(e) => props.handleDarkenPreviewChange(e.target.value)}
            onBlur={props.commitDarken}
          />
        </BottomToolbar>
      </ThemeProvider>
    </>
  );
};

export default ParallaxBackgroundDefaultControls;
