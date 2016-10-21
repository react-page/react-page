// @flow
import { identity } from 'ramda'
import React, { Component, PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import * as hoverActions from 'src/editor/actions/cell/drag'
import * as insertActions from 'src/editor/actions/cell/insert'
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { target, source, connect as monitorConnect, collect } from './helper/dnd'
import styles from './index.scoped.css'
import classNames from 'classnames'

class DragDroppable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img)
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAYAAADtt+XCAAAF3ElEQVR4nO3dQYqkdwHG4bcrY+cKagINmhuoC2+RQOIpdKGLBC8gxGz1FKKJ91AE15PFB4YcQDeOSFz0DJnECWN+2Kmp6eeBhqb4L16aj/pRX1dXXx3HsWe43vbm468fb/vu48cAePn9Y9vftv1l24fb/rjt0ZcPXT0jIG9t+/W2N+54IACX4eG297b94ekHT099/8q29x8fEA8Annhj2+9324hXnjz44KkDv9r27jc8CoDL8aQR722fvwJ5e+IBwPO9u9tm7Oo4juttH297/ayTALgUn2z73mnbOxMPAP53r237yWm3b9UFgK/jzdO2H517BQAX54enbd8+9woALs53TttePfcKAC7O9en5ZwDgvwkIAImAAJAICACJgACQCAgAiYAAkDx4/hHgktzc3Jx7wr3wFf/N9V6504C4kOGreQLi0rmFBUAiIAAkAgJAIiAAJAICQCIgACQCAkAiIAAkAgJAIiAAJAICQCIgACQCAkBydRzHZ+ceAcDl8QoEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASB6cewDw9d3c3Jx7wr1xHMe5J7yw7jwg9+1C/39ebPftZ3efeFLiZeAWFgCJgACQCAgAiYAAkAgIAImAAJAICACJgACQCAgAiYAAkAgIAMmdfxaWz/wBeDldHcfx2blHAHB53MICIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIBEQABIBASAREAASAQEgERAAEgEBIDlt+/u5RwBwcR6dtn167hUAXJxPT9v+eu4VAFycP522fXTuFQBcnI+ujuO43vbxttfPvQaAi/DJtu+ftj3a9oszjwHgcvx82z+fvI33d9s+OOMYAC7DB7ttxhf+DuSX235zljkAXILf7rYV274YkH9v+9m2t7c9/IZHAfDierjtnW0/3W0rtm1Xx3E86/D148NvbfvBtte2fevuNwLwAvjXbn9R/udtH+72ltWjLx/6D9CMVywgbxXPAAAAAElFTkSuQmCC'

  }
  render() {
    const {
      allowDrop = false,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isLayoutMode, isInsertMode,
      className,
      node: {
        hover,
        inline,
      },
      children
    } = this.props

    const decorator = allowDrop && !inline ? connectDropTarget : identity
    let classes = classNames(
      'draggable',
      {
        'is-over-current': hover && allowDrop,
        [`is-over-${hover}`]: hover && allowDrop,
        'is-dragging': isDragging
      }
    )

    if (!(isLayoutMode || isInsertMode)) {
      classes = ''
    }

    if (isLayoutMode || isInsertMode) {
      return connectDragSource(decorator(
        <div styleName={classes} className={className}>
          {children}
        </div>
      ))
    }

    return (
      <div styleName={classes} className={className}>
        {children}
      </div>
    )
  }
}

DragDroppable.propTypes = {
  allowDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
  isOverCurrent: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    hover: PropTypes.string
  }).isRequired,

  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,

  dragCell: PropTypes.func.isRequired,
  clearHover: PropTypes.func.isRequired
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default connect(null, mapDispatchToProps)(dropTarget(({ dropTypes }: { dropTypes: Array<string> }) => dropTypes, target, monitorConnect)(dragSource(({ dragType }: { dragType: string }) => dragType, source, collect)(cssModules(DragDroppable, styles, { allowMultiple: true }))))
