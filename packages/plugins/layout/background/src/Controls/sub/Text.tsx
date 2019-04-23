import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { BackgroundProps } from '../../types/component';

export interface TextComponentProps {
  ensureModeOn: () => void;  
  forecolor?: string;  
}

class TextComponent extends React.Component<
BackgroundProps & TextComponentProps
> {
  handleChangeForecolor = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ forecolor: e.target.value });
  }  

  render() {
    const {
      state: { forecolor = this.props.defaultForecolor },
    } = this.props;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <TextField
            placeholder="#fff"
            label={'Forecolor'}
            style={{ width: '256px' }}
            value={forecolor}
            onChange={this.handleChangeForecolor}
          />
        </div>        
      </div>
    );
  }
}

export default TextComponent;
