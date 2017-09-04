// @flow
import React from 'react'
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import TextField from 'material-ui/TextField'
import { BottomToolbar } from 'ory-editor-ui'

export type Props = ContentPluginProps<*>

const changeUrl = (onChange: any) => (event: Event, newValue: string) =>
  onChange({ url: newValue })

const HTML5Video = ({
  readOnly,
  onChange,
  state: { url = '' },
  focused
}: {
  readOnly: boolean,
  onChange: any,
  state: { url: string },
  focused: boolean
}) =>
  <div className="ory-content-plugin-html5-video">
    {!readOnly
      ? <BottomToolbar open={focused}>
          <TextField
            hintText="https://example.com/video.webm"
            floatingLabelText="Video url"
            onChange={changeUrl(onChange)}
            inputStyle={{ color: 'white' }}
            floatingLabelStyle={{ color: 'white' }}
            hintStyle={{ color: 'grey' }}
            value={url}
          />
        </BottomToolbar>
      : null}
    <video autoPlay controls loop muted width="100%">
      <source src={url} type={`video/${url.split('.').pop()}`} />
    </video>
  </div>

export default HTML5Video
