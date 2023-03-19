import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ImageUpload, useUiTranslator } from '@react-page/editor';
import React from 'react';
import type { ImageControlType } from '../types/controls';

const ImageControls: ImageControlType = (props) => {
  const { t } = useUiTranslator();
  return (
    <>
      {/* Button and existing image text box */}
      <div>
        {props.imageUpload && (
          <>
            <ImageUpload
              translations={props.translations}
              imageUpload={props.imageUpload}
              style={{
                width: '100%',
              }}
              imageUploaded={(image) =>
                props.onChange({
                  src: image.url,
                })
              }
            />
            <Typography variant="body1" style={{ marginTop: '16px' }}>
              {t(props.translations?.or)}
            </Typography>
          </>
        )}
        <TextField
          placeholder={t(props.translations?.srcPlaceholder) ?? ''}
          label={t(
            props.imageUpload
              ? props.translations?.haveUrl
              : props.translations?.imageUrl
          )}
          name="src"
          // style={{ flex: 1 }}
          fullWidth
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
        placeholder={t(props.translations?.hrefPlaceholder) ?? ''}
        label={t(props.translations?.hrefLabel) ?? ''}
        name="href"
        fullWidth
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
            checked={props.data.openInNewWindow ?? false}
            onChange={(e) =>
              props.onChange({
                openInNewWindow: e.target.checked,
              })
            }
          />
        }
        label={t(props.translations?.openNewWindow)}
      />

      <br />
      {/* Image's meta like alt... */}
      <TextField
        placeholder={t(props.translations?.altPlaceholder) ?? ''}
        label={t(props.translations?.altLabel) ?? ''}
        name="alt"
        fullWidth
        value={props.data.alt ?? ''}
        onChange={(e) =>
          props.onChange({
            alt: e.target.value,
          })
        }
      />
    </>
  );
};

export default ImageControls;
