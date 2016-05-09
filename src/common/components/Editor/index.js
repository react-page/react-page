import {
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
  Editor as DraftEditor,
  EditorState,
  Entity,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  RichUtils,
  SelectionState
} from 'draft-js'
import { Map } from 'immutable'
import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import 'draft-js/dist/Draft.css'


import Katex from 'src/common/components/Katex'

import './styles.css'

const focusOnMount = (input) => {
  if (input) {
    input.focus()
  }
}

class LatexEquation extends Component {
  render() {
    const { block, blockProps } = this.props

    const { src } = Entity.get(block.getEntityAt(0)).getData()
    const editing = blockProps.editing

    let editor

    if (editing) {
      editor = (
        <textarea onChange={blockProps.onChange}
                  onBlur={blockProps.onBlur}
                  ref={focusOnMount}
                  style={{
                    width: '100%',
                    height: '3em'
                  }}
                  value={src} />
      )
    }

    return (
      <div>
        <Katex onClick={blockProps.onClick} src={src} />
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {editor}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

LatexEquation.propTypes = {
  block: PropTypes.shape({
    getEntityAt: PropTypes.func.isRequired
  }).isRequired,
  blockProps: PropTypes.shape({
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }).isRequired
}

class Editor extends Component {
  constructor(props) {
    super(props)

    const rawContent = props.storage.get()

    let editorState

    try {
      const content = convertFromRaw(rawContent)

      editorState = EditorState.createWithContent(content)
    } catch (e) {
      editorState = EditorState.createEmpty()
    } finally {
      this.state = {
        editorState,
        liveBlockEdits: Map()
      }
    }

    this.blockRenderer = this.blockRenderer.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.onChange = (editorState) => this.setState({ editorState })

    this.addLatexEquation = this.addLatexEquation.bind(this)
    this.removeLatexEquation = this.removeLatexEquation.bind(this)
  }

  blockRenderer(block) {
    switch (block.getType()) {
      case 'atomic': {
        const blockKey = block.getKey()
        const entity = Entity.get(block.getEntityAt(0))

        switch (entity.getType()) {
          case 'LATEX_EQUATION':
            return {
              component: LatexEquation,
              editable: false,
              props: {
                editing: this.state.liveBlockEdits.get(blockKey, false),

                onBlur: () => {
                  const { editorState, liveBlockEdits } = this.state

                  this.setState({
                    liveBlockEdits: liveBlockEdits.remove(blockKey),
                    editorState: EditorState.forceSelection(editorState, editorState.getSelection())
                  })
                },

                onChange: (e) => {
                  const { editorState } = this.state

                  const entityKey = block.getEntityAt(0)

                  Entity.mergeData(entityKey, {
                    src: e.target.value
                  })

                  this.setState({
                    editorState: EditorState.forceSelection(editorState, editorState.getSelection())
                  })
                },

                onClick: () => {
                  const { editorState, liveBlockEdits } = this.state

                  this.setState({
                    editorState: EditorState.forceSelection(editorState, editorState.getSelection()),
                    liveBlockEdits: liveBlockEdits.set(blockKey, true)
                  })
                }
              }
            }
          default:
            return null
        }
      }
      default:
        return null
    }
  }

  addLatexEquation() {
    const { editorState } = this.state

    const entityKey = Entity.create(
      'LATEX_EQUATION',
      'IMMUTABLE',
      { src: '' }
    )

    this.setState({
      liveBlockEdits: Map(),
      editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    })
  }

  removeLatexEquation(blockKey) {
    const { editorState, liveBlockEdits } = this.state

    const content = editorState.getCurrentContent()
    const block = content.getBlockForKey(blockKey)

    const targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: block.getLength()
    })

    const withoutEquation = Modifier.removeRange(content, targetRange, 'backward')
    const resetBlock = Modifier.setBlockType(
      withoutEquation,
      withoutEquation.getSelectionAfter(),
      'unstyled'
    )

    const newState = EditorState.push(editorState, resetBlock, 'remove-range')

    this.setState({
      liveBlockEdits: liveBlockEdits.remove(blockKey),
      editorState: EditorState.forceSelection(newState, resetBlock.getSelectionAfter())
    })
  }

  handleKeyCommand(command) {
    switch (command) {
      case 'editor-save': {
        const { storage } = this.props
        const { editorState } = this.state

        storage.set(convertToRaw(editorState.getCurrentContent()))

        return true
      }
      default: {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

        if (newState) {
          this.onChange(newState)
          return true
        }
      }
    }

    return false
  }

  keyBindingFn(e) {
    if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'editor-save'
    }

    return getDefaultKeyBinding(e)
  }

  render() {
    return (
      <div>
        <button onClick={this.addLatexEquation}>Insert Equation</button>
        <DraftEditor blockRendererFn={this.blockRenderer}
                     editorState={this.state.editorState}
                     handleKeyCommand={this.handleKeyCommand}
                     keyBindingFn={this.keyBindingFn}
                     onChange={this.onChange}
                     placeholder="Tell your story..."
                     readOnly={this.state.liveBlockEdits.count()}
                     spellCheck />
      </div>
    )
  }
}

Editor.propTypes = {
  storage: PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired
  }).isRequired
}

Editor.defaultProps = {
  storage: {
    get() {},
    set() {}
  }
}

export default Editor
