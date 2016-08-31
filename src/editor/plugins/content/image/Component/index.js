// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import ImageIcon from 'material-ui/svg-icons/image/panorama'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import styles from './index.scoped.css'
import Notifier from 'src/editor/components/Notifier'
import TypeException from 'src/editor/exceptions/TypeException'

type PropTypes = {
  state: { src: string, caption: string },
  onChange(): void,
  readOnly: boolean,
  focused: boolean
}

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
    </div>
    <p>
      <CaptionInput {...props} state={state} />
    </p>
  </div>
), styles, { allowMultiple: true })

const Caption = cssModules(({ state: { caption } }: PropTypes) => caption ? (
  <p styleName="caption">
    <small>{caption}</small>
  </p>
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

  return (
    <div>
      {
        focused && !readOnly ? (
          <div>
            <ImageForm {...props} />
          </div>
        ) : (
          <Display {...props} />
        )
      }
      <Notifier
        message="Drop, click or paste a url to upload an image."
        open={focused && !readOnly}
        id="image-upload-hint-dismissed"
      />
    </div>
  )
}

export default cssModules(Image, styles, { allowMultiple: true })
