import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ImageUpload, useUiTranslator } from '@react-page/editor';
import React from 'react';
import { ImageControlType } from '../types/controls';

const ImageControls: ImageControlType = (props) => {
  const { t } = useUiTranslator();
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {props.imageUpload && (
          <React.Fragment>
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
              style={{ marginLeft: '20px', marginRight: '20px' }}
            >
              {t(props.translations.or)}
            </Typography>
          </React.Fragment>
        )}
        <TextField
          placeholder={t(props.translations.srcPlaceholder)}
          label={t(
            props.imageUpload
              ? props.translations.haveUrl
              : props.translations.imageUrl
          )}
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
      <TextField
        placeholder={t(props.translations.hrefPlaceholder)}
        label={t(props.translations.hrefLabel)}
        name="href"
        style={{ width: '512px' }}
        value={props.data.href ?? ''}
        onChange={(e) =>
          props.onChange({
            href: e.target.value,
          })
        }
      />
      <br />
      <br />
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
        label={t(props.translations.openNewWindow)}
      />
    </div>
  );
};

export default ImageControls;
