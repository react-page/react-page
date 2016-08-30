// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import ImageIcon from 'material-ui/svg-icons/image/panorama'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import styles from './index.scoped.css'


type PropTypes = { state: { src: string }, onChange(): void, readOnly: boolean }

const CaptionInput = cssModules(({ state: { caption }, onChange }: PropTypes) => (
  <small>
    <input styleName="caption" type="text" placeholder="Type caption for image (optional)"
           onChange={(e: Event) => onChange({ caption: e.target.value })} value={caption}
    />
  </small>
), styles, { allowMultiple: true })

// material icons isn't allowing us to override style properties with className/styleName
const iconStyle = {
  width: '100%',
  height: 'auto',
  padding: '0 40%',
  color: '#aaa',
  textAlign: 'center',
  minWidth: 64,
  minHeight: 64,
  maxHeight: 256
}

const ImageForm = cssModules(({ state: { src, ...state }, ...props }: PropTypes) => src ? (
  <div>
    <img styleName="image" src={src} />
    <p>
      <CaptionInput {...props} state={state} />
    </p>
  </div>
) : (
  <div>
    <div styleName="placeholder">
      <UploadIcon style={iconStyle} />
      <small styleName="placeholder-help">
        Drop, click or paste a url to upload an image.
      </small>
    </div>
    <p>
      <CaptionInput {...props} state={state} />
    </p>
  </div>
), styles, { allowMultiple: true })

const Caption = cssModules(({ state: { caption } }: PropTypes) => caption ? (
  <p styleName="caption"><small>{caption}</small></p>
) : (
  null
), styles, { allowMultiple: true })

const Display = cssModules(({ state: { src, ...state } }: PropTypes) => src ? (
  <div>
    <img styleName="image" src={src} />
    <Caption state={state} />
  </div>
) : (
  <div>
    <div styleName="placeholder">
      <ImageIcon style={iconStyle} />
    </div>
    <Caption state={state} />
  </div>
), styles, { allowMultiple: true })

const Image = (props: PropTypes) => {
  const { focused, readOnly } = props
  if (focused && !readOnly) {
    return <ImageForm {...props} />
  }

  return <Display {...props} />
}

export default cssModules(Image, styles, { allowMultiple: true })
