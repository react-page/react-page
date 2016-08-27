import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'

const hotKeyMap = {
  undo: 'command+z',
  redo: ['command+shift+z', 'command+y'],
}

const Decorator = ({ children}:{children: any }) => (
  <HotKeys keyMap={hotKeyMap}>
    <div>
      {children}
    </div>
  </HotKeys>
)

Decorator.propTypes = {
  children: PropTypes.object.isRequired
}


export default Decorator
