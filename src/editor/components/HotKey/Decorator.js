import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import Handler from './Handler'

const hotKeyMap = {
  undo: ['ctrl+z', 'ctrl+z'],
  redo: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y']
}

const Decorator = ({ children, id }: { children: any, id: string }) => (
  <HotKeys keyMap={hotKeyMap}>
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
