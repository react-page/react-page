import * as React from "react";
import { ImageControlsProps } from "../types/controls";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/lab/Slider";
import { ImageUpload } from "ory-editor-ui";

import { BottomToolbar } from "ory-editor-ui";
import {
  darkTheme,
  default as ThemeProvider
} from "ory-editor-ui/lib/ThemeProvider";

const ImageDefaultControls: React.SFC<ImageControlsProps> = props => {
  const {
    Renderer,
    handleImageLoaded,
    handleImageUploaded,
    handleChange,
    handleChangeBorderRadius,
    handleChangeWidth,
    readOnly,
    focused,
    state
  } = props;

  const { borderRadius = 0, width = 100 } = state;

  return (
    <div>
      <Renderer {...props} imagePreview={props.imagePreview} />
      {!readOnly && focused && (
        <ThemeProvider theme={darkTheme}>
          <BottomToolbar open={props.focused} theme={darkTheme}>
            <div style={{ display: "flex" }}>
              {props.imageUpload && (
                <React.Fragment>
                  <ImageUpload
                    imageUpload={props.imageUpload}
                    imageLoaded={handleImageLoaded}
                    imageUploaded={handleImageUploaded}
                  />
                  <Typography
                    variant="body1"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    OR
                  </Typography>
                </React.Fragment>
              )}
              <TextField
                placeholder="http://example.com/image.png"
                label={props.imageUpload ? "I have a URL" : "Image URL"}
                name="src"
                style={{ flex: 1 }}
                value={props.state.src}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                placeholder="http://example.com"
                label="Link location (url)"
                name="href"
                style={{ width: "250px" }}
                value={props.state.href}
                onChange={handleChange}
              />
              {props.state.href && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.state.target === "_blank"}
                      name="target"
                      onChange={handleChange}
                    />
                  }
                  label="Open in new window"
                />
              )}
            </div>

            <div>
              <Typography variant="body2" id="width">
                width ({width.toFixed(0)}
                %)
              </Typography>
              <Slider
                aria-labelledby="width"
                value={width}
                onChange={handleChangeWidth}
                step={5}
                min={0}
                max={100}
              />
            </div>
            <div style={{ flex: "1", marginLeft: "8px" }}>
              <Typography variant="body1" id="linear-gradient-lighten-label">
                Border Radius ({borderRadius.toFixed(0)}
                %)
              </Typography>
              <Slider
                aria-labelledby="linear-gradient-lighten-label"
                value={borderRadius}
                onChange={handleChangeBorderRadius}
                step={5}
                min={0}
                max={100}
              />
            </div>
            <br />
            <br />
          </BottomToolbar>
        </ThemeProvider>
      )}
    </div>
  );
};

export default ImageDefaultControls;
