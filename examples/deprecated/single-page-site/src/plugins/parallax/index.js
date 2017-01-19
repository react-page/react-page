import React from 'react'
import Announcement from 'material-ui/svg-icons/image/landscape'
import Slate from 'src/editor/plugins/content/slate'
import uuid from 'uuid'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

type Props = {
  children: Node,
  readOnly: boolean,
  state: {style: string },
  onChange(state: Object): void
}

const ParallaxComponent = ({ children, state: { style, align }, readOnly, onChange }: Props) => (
  <section id="two" className={`main style${style}`}>
    {
      readOnly ? null : (
        <div style={{
          float: 'right',
          position: 'absolute',
          right: 0,
          zIndex: 1,
          backgroundColor: 'rgba(255,255,255,.8)',
          padding: '4px 20px'
        }}
        >
          <SelectField
            value={style} onChange={(e: any, i: any, v: any) => onChange({ style: v })}
            floatingLabelText="Select section style"
          >
            <MenuItem value={1} primaryText="White" />
            <MenuItem value={2} primaryText="Mountains" />
            <MenuItem value={3} primaryText="Lights" />
            <MenuItem value={4} primaryText="Grass" />
            <MenuItem value={5} primaryText="Lake" />
          </SelectField>
        </div>
      )
    }
    <div className="container" style={{
      textAlign: align
    }}
    >
      <div>
        {children}
      </div>
    </div>
  </section>
)

const defaultPlugin = new Slate()

export default {
  Component: ParallaxComponent,
  name: 'example/layout/parallax',
  version: '0.0.1',
  IconComponent: <Announcement />,
  text: 'Parallax Background',

  createInitialChildren: () => ({
    id: uuid(),
    rows: [{
      id: uuid(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid(),
      }]
    }]
  })
}
