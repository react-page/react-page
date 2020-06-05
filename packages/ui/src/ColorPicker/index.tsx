import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ColorizeIcon from '@material-ui/icons/Colorize';
import * as React from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import { colorToString } from './colorToString';
import { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps: Partial<ColorPickerProps> = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />,
  };
  anchorEl: HTMLElement;

  state: ColorPickerState = {
    isColorPickerVisible: false,
  };

  props: ColorPickerProps;

  handleClickShowColorPicker = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onDialogOpen) {
      this.props.onDialogOpen();
    }
    this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
  };

  onChange: ColorChangeHandler = (e) =>
    this.props.onChange && this.props.onChange(e.rgb);

  handleChangeComplete: ColorChangeHandler = (e) =>
    this.props.onChangeComplete && this.props.onChangeComplete(e.rgb);

  render() {
    return (
      <React.Fragment>
        <Button
          buttonRef={(node: HTMLElement) => {
            this.anchorEl = node;
          }}
          variant="contained"
          onClick={this.handleClickShowColorPicker}
          style={
            {
              ...this.props.style,
              borderColor: colorToString(this.props.color),
              borderStyle: 'solid',
              borderWidth: '2px',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        >
          {this.props.buttonContent}
          {this.props.icon}
        </Button>
        <Popover
          open={this.state.isColorPickerVisible}
          anchorEl={this.anchorEl}
          onClose={this.handleClickShowColorPicker}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <div>
            <ChromePicker
              color={this.props.color}
              onChange={this.onChange}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default ColorPicker;
