import TextField from '@material-ui/core/TextField';
import { BottomToolbar } from '@react-page/ui';
import * as React from 'react';
import { defaultHtml5VideoState } from '../default/state';
import { Html5VideoControlsProps } from './../types/controls';

export interface Html5VideoDefaultControlsProps {}

/*const changeUrl = (onChange: (state: Html5VideoState) => void) => (
  event: React.ChangeEvent<HTMLInputElement>
) => event.target && onChange({ url: event.target.value });*/

const Html5VideoDefaultControls: React.SFC<Html5VideoControlsProps> = (
  props
) => {
  const {
    state: { url } = defaultHtml5VideoState,
    commitUrl,
    changeUrlPreview,
    focused,

    remove,
  } = props;
  return (
    <BottomToolbar
      open={focused}
      title={props.translations.pluginName}
      onDelete={remove}
      {...props}
    >
      <TextField
        placeholder={props.translations.urlPlaceholder}
        label={props.translations.urlLabel}
        onChange={(e) => changeUrlPreview(e.target.value)}
        onBlur={commitUrl}
        value={url}
        style={{ width: '512px' }}
      />
    </BottomToolbar>
  );
};

export default Html5VideoDefaultControls;
