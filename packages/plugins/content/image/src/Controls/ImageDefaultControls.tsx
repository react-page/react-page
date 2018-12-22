import * as React from 'react';
import { ImageControlsProps } from '../types/controls';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { ImageUpload } from 'ory-editor-ui';

import { BottomToolbar } from 'ory-editor-ui';
import { darkTheme, default as ThemeProvider } from 'ory-editor-ui/lib/ThemeProvider';

const ImageDefaultControls: React.SFC<ImageControlsProps> = props => {
  const { Renderer, handleImageLoaded, handleImageUploaded, handleChange, readOnly, focused } = props;
  return (
    <div>
      <Renderer {...props} imagePreview={props.imagePreview} />
      {!readOnly && focused && <ThemeProvider theme={darkTheme}>
        <BottomToolbar open={props.focused} theme={darkTheme}>
          <div style={{ display: 'flex' }}>
            {props.imageUpload && (
              <React.Fragment>
                <ImageUpload
                  imageUpload={props.imageUpload}
                  imageLoaded={handleImageLoaded}
                  imageUploaded={handleImageUploaded}
                />
                <Typography
                  variant="body1"
                  style={{ marginLeft: '20px', marginRight: '20px' }}
                >
                  OR
                </Typography>
              </React.Fragment>
            )}
            <TextField
              placeholder="http://example.com/image.png"
              label={props.imageUpload ? 'I have a URL' : 'Image URL'}
              name="src"
              style={{ flex: 1 }}
              value={props.state.src}
              onChange={handleChange}
            />
          </div>
          <TextField
            placeholder="http://example.com"
            label="Link location (url)"
            name="href"
            style={{ width: '512px' }}
            value={props.state.href}
            onChange={handleChange}
          />
          <br />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.state.target === '_blank'}
                name="target"
                onChange={handleChange}
              />
            }
            label="Open in new window"
          />
        </BottomToolbar>
      </ThemeProvider>}
    </div>
  );
};

export default ImageDefaultControls;
