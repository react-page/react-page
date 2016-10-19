// @flow
import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from '../index.scoped.css'
import { iconStyle } from '../common.js'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import TypeException from 'src/editor/exceptions/TypeException'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import type { PropTypes } from '../index.js'


import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ caption: target.value })
    return
  }

  throw new TypeException('target', 'HTMLInputElement', target)
}

const CaptionInput = cssModules(({ state: { caption }, onChange }: PropTypes) => (
  <small>
    <input styleName="caption" type="text" placeholder="Type caption for image (optional)"
           onChange={handleChange(onChange)} value={caption}
    />
  </small>
), styles, { allowMultiple: true })

class Form extends Component {
  props: PropTypes

  onDrop = (files: []) => {
    // todo obviously fix this stuff
    const { onChange } = this.props
    const req = request.post('http://localhost:3333/images/foobar')
    files.forEach((file: []) => {
      req.attach('images', file)
    })
    req.end((err, res) => {
      if (err || !res.ok) {
        console.error('Image could not be uploaded because', err)
      } else {
        onChange({ src: res.body[0].location })
      }
    })
  }

  onRef = (node: any) => {
    this.dropzone = node
  }

  onClickUpload = () => {
    this.dropzone.open()
  }

  render() {
    const { state: { src, ...state }, focused, ...props } = this.props

    if (src) {
      return (
        <div>
          <Dropzone ref={this.onRef} onDrop={this.onDrop} multiple={false} style={{ display: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, margin: '24px', background: 'rgba(255,255,255,0.4)', boxShadow: 'rgba(255,255,255,0.4) 0 0 4px',  }}>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
              <MenuItem onClick={this.onClickUpload} primaryText="Replace image"/>
            </IconMenu>
          </div>
          <img styleName="image" src={src}/>
          {focused || state.caption ? (
            <p>
              <CaptionInput {...props} state={state}/>
            </p>
          ) : null}
        </div>
      )
    }

    return (
      <div>
        <div styleName="placeholder">
          <Dropzone ref={this.onRef} onDrop={this.onDrop} multiple={false} style={{ width: '100%', border: 'none' }}>
            <UploadIcon style={iconStyle} accept="image/*" maxSize={20 * 1024 * 1024}/>
            <small>Drop an image here, or click to select an image to upload.</small>
          </Dropzone>
        </div>
        <p style={{ borderTop: '1px solid rgba(0,0,0,.4)' }}>
          <CaptionInput {...props} state={state}/>
        </p>
      </div>
    )
  }
}

export default cssModules(Form, styles, { allowMultiple: true })
