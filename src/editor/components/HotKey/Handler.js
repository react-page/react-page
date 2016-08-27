// @flow
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'

const handlers = ({ id, undo, redo }: { id: string, undo: Function, redo: Function }) => ({
  undo: () => undo(id),
  redo: () => redo(id)
})

const Decorator = ({ children, ...props }: { children: any, id: string, undo: Function, redo: Function }) => (
  <HotKeys handlers={handlers(props)}>
    {children}
  </HotKeys>
)

Decorator.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired
}

const mapStateToProps = null

const mapDispatchToProps = {
  undo,
  redo
}

export default connect(mapStateToProps, mapDispatchToProps)(Decorator)
