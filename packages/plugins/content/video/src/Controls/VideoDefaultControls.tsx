import TextField from '@material-ui/core/TextField';
import { BottomToolbar } from '@react-page/ui';
import * as React from 'react';
import { defaultVideoState } from '../default/state';
import { VideoControlsProps } from '../types/controls';

const Form: React.SFC<VideoControlsProps> = (props) => {
  const {
    focused,
    changeSrcPreview,
    commitSrc,
    remove,
    state: { src } = defaultVideoState,
  } = props;

  return (
    <BottomToolbar
      open={focused}
      title={props.translations.pluginName}
      icon={props.IconComponent}
      onDelete={remove}
      {...props}
    >
      <TextField
        placeholder={props.translations.placeholder}
        label={props.translations.label}
        style={{ width: '512px' }}
        value={src}
        onChange={(e) => changeSrcPreview(e.target.value)}
        onBlur={commitSrc}
      />
    </BottomToolbar>
  );
};

export default Form;
