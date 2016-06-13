import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {beginEditingEntity, finishEditingEntity, mergeEntityData} from "../actions";
import {entityData, entityIsEdited} from "../selectors";

const createBlockPlugin = (RenderedComponent, EditedComponent) => {
  class BlockPlugin extends Component {
    constructor(props) {
      super(props)

      const {beginEditingEntity, finishEditingEntity, mergeEntityData, blockProps} = props
      const {entityKey} = blockProps

      // this.onAfterOpen = () => this.refs.editor.focus()
      this.onChange = (data) => mergeEntityData(entityKey, data)
      this.onClick = () => beginEditingEntity(entityKey)
      this.onBlur = () => finishEditingEntity(entityKey)
    }

    render() {
      const {data, edited} = this.props

      if (edited) {
        return (
          <EditedComponent autoFocus
                           data={data}
                           onBlur={this.onBlur}
                           onChange={this.onChange}
                           ref="editor"/>
        )
      }

      return (
        <div onClick={this.onClick}>
          <RenderedComponent data={data}/>
        </div>
      )
    }
  }

  BlockPlugin.propTypes = {
    blockProps: PropTypes.shape({
      entityKey: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.object.isRequired,
    edited: PropTypes.bool.isRequired,
    beginEditingEntity: PropTypes.func.isRequired,
    finishEditingEntity: PropTypes.func.isRequired,
    mergeEntityData: PropTypes.func.isRequired
  }

  const mapStateToProps = (state, {blockProps}) => ({
    data: entityData(blockProps.entityKey)(state),
    edited: entityIsEdited(blockProps.entityKey)(state)
  })

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    beginEditingEntity,
    finishEditingEntity,
    mergeEntityData
  }, dispatch)

  return connect(mapStateToProps, mapDispatchToProps)(BlockPlugin)
}

export default createBlockPlugin
