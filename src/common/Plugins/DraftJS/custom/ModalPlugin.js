import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { beginEditingEntity, finishEditingEntity, mergeEntityData } from '../actions'
import { entityData, entityIsEdited } from '../selectors'

const createModalPlugin = (RenderedComponent, EditedComponent) => {
  class ModalPlugin extends Component {
    constructor(props) {
      super(props)

      this.state = props.data

      const { beginEditingEntity, finishEditingEntity, mergeEntityData, entityKey } = props

      this.onAfterOpen = () => this.refs.editor.focus()
      this.onChange = (data) => this.setState(data)
      this.onClick = () => beginEditingEntity(entityKey)
      this.onRequestClose = () => {
        mergeEntityData(entityKey, this.state)
        finishEditingEntity(entityKey)
      }
    }

    render() {
      const { data, edited } = this.props

      if (edited) {
        return (
          <Modal isOpen={edited}
                 onAfterOpen={this.onAfterOpen}
                 onRequestClose={this.onRequestClose}
                 style={{ overlay: { zIndex: 99 } }}>
            <EditedComponent data={this.state}
                             onChange={this.onChange}
                             ref="editor" />
          </Modal>
        )
      }

      return (
        <span onClick={this.onClick}>
          <RenderedComponent data={data} />
        </span>
      )
    }
  }

  ModalPlugin.propTypes = {
    entityKey: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    edited: PropTypes.bool.isRequired,
    beginEditingEntity: PropTypes.func.isRequired,
    finishEditingEntity: PropTypes.func.isRequired,
    mergeEntityData: PropTypes.func.isRequired
  }

  const mapStateToProps = (state, { entityKey }) => ({
    data: entityData(entityKey)(state),
    edited: entityIsEdited(entityKey)(state)
  })

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    beginEditingEntity,
    finishEditingEntity,
    mergeEntityData
  }, dispatch)

  return connect(mapStateToProps, mapDispatchToProps)(ModalPlugin)
}

export default createModalPlugin
