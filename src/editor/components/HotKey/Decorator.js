import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import Handler from './Handler'

const hotKeyMap = {
  undo: ['ctrl+z', 'command+z'],
  redo: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
  remove: ['del', 'backspace'],
  focusNext: ['down', 'right'],
  focusPrev: ['up', 'left'],
  // insert: ['insert']
}

const Decorator = ({ children, id }: { children: any, id: string }) => (
  <HotKeys keyMap={hotKeyMap} style={{ outline: 'none' }}>
    <Handler id={id}>
      {children}
    </Handler>
  </HotKeys>
)

Decorator.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
}

export default Decorator
