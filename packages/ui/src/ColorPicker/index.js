// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import { ChromePicker } from 'react-color'
import ColorizeIcon from '@material-ui/icons/Colorize';

export type Color = {
  r: number,
  g: number,
  b: number,
  a: number
}

export type ColorPickerProps = {
  onChange: (color: Color) => void,
  onChangeComplete?: (color: Color) => void,
  color: Color,
  buttonContent?: Node,
  icon?: Node,
  onDialogOpen?: () => void
}

type ColorPickerState = {
  isColorPickerVisible: boolean
}

class ColorPicker extends Component  {
  anchorEl: any = undefined

  state: ColorPickerState
  props: ColorPickerProps

  static defaultProps = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />
  }

  constructor(props: ColorPickerProps) {
    super(props)
    this.state = {
      isColorPickerVisible: false
    }
  }

  handleClickShowColorPicker = (e: any) => (this.props.onDialogOpen && this.props.onDialogOpen()) |
    this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible })

  onChange = (e: any) => this.props.onChange && this.props.onChange(e.rgb)

  onChangeComplete = (e: any) => this.props.onChangeComplete && this.props.onChangeComplete(e.rgb)

  render() {
    return (
      <React.Fragment>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          variant="contained"
          onClick={this.handleClickShowColorPicker}
          style={{
            ...this.props.style,
            borderColor: colorToString(this.props.color),
            borderStyle: 'solid',
            borderWidth: '2px'
          }}
        >
          {this.props.buttonContent}{this.props.icon}
        </Button>
        <Popover
          className="ory-prevent-blur"
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
          <ChromePicker
            className="ory-prevent-blur"
            color={this.props.color}
            onChange={this.onChange}
            onChangeComplete={this.onChangeComplete}
          />
        </Popover>
      </React.Fragment>
    );
  }
}

export const colorToString = (c: Color) => c && 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

export default ColorPicker