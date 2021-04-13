import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ImageUpload } from '@react-page/editor';
import React from 'react';
import { ImageControlType } from '../types/controls';

const ImageControls: ImageControlType = (props) => {
  return (
    <>
      {/* Button and existing image text box */}
      <div style={{ display: 'flex' }}>
        {props.imageUpload && (
          <>
            <ImageUpload
              translations={props.translations}
              imageUpload={props.imageUpload}
              imageUploaded={(image) =>
                props.onChange({
                  src: image.url,
                })
              }
            />
            <Typography
              variant="body1"
              style={{ margin: '20px 16px 0 16px' }}
            >
              {props.translations.or}
            </Typography>
          </>
        )}
        <TextField
          placeholder={props.translations.srcPlaceholder}
          label={
            props.imageUpload
              ? props.translations.haveUrl
              : props.translations.imageUrl
          }
          name="src"
          // style={{ flex: 1 }}
          value={props.data.src ?? ''}
          onChange={(e) =>
            props.onChange({
              src: e.target.value,
            })
          }
        />
      </div>

      <br />

      {/* Image link textbox and checkbox */}
      <TextField
        placeholder={props.translations.hrefPlaceholder}
        label={props.translations.hrefLabel}
        name="href"
        style={{ width: '400px' }}
        value={props.data.href ?? ''}
        onChange={(e) =>
          props.onChange({
            href: e.target.value,
          })
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            value={props.data.openInNewWindow ?? false}
            onChange={(e) =>
              props.onChange({
                openInNewWindow: e.target.checked,
              })
            }
          />
        }
        label={props.translations.openNewWindow}
      />
    </>
  );
};

export default ImageControls;
