import React, { Component } from 'react'
import { ColorPicker } from 'ory-editor-ui'

class ColorComponent extends Component {
  handleChangePickerBackgroundColor = (e: any) =>
    this.props.onChangeBackgroundColorPreview &&
    this.props.onChangeBackgroundColorPreview(e)

  handleChangePickerBackgroundColorComplete = (e: any) =>
    (this.props.onChangeBackgroundColorPreview &&
      this.props.onChangeBackgroundColorPreview(undefined)) |
    this.props.onChange({ backgroundColor: e })

  render() {
    const {
      backgroundColorPreview,
      state: { backgroundColor = this.props.defaultBackgroundColor }
    } = this.props
    return (
      <div style={{ display: 'flex' }}>
        <ColorPicker
          color={
            backgroundColorPreview ? backgroundColorPreview : backgroundColor
          }
          onChange={this.handleChangePickerBackgroundColor}
          onDialogOpen={this.props.ensureModeOn}
          onChangeComplete={this.handleChangePickerBackgroundColorComplete}
          style={{ margin: 'auto' }}
        />
      </div>
    )
  }
}

export default ColorComponent
