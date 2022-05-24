import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ColorizeIcon from '@mui/icons-material/Colorize';
import React from 'react';
import type { ColorChangeHandler } from 'react-color';
import { ChromePicker } from 'react-color';
import { colorToString } from './colorToString';
import type { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps: Partial<ColorPickerProps> = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />,
  };
  anchorEl: HTMLElement | null = null;

  state: ColorPickerState = {
    isColorPickerVisible: false,
  };

  handleClickShowColorPicker = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props?.onDialogOpen) {
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
          ref={(node) => {
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
              color={this.props.color ?? undefined}
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
