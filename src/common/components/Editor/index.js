import {
  AtomicBlockUtils,
  CompositeDecorator,
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
import Modal from 'react-modal'
import 'draft-js/dist/Draft.css'

import Katex from 'src/common/components/Katex'
import { createEntityTypeStrategy } from './strategies'

import './styles.css'

class LatexInline extends Component {
  constructor(props) {
    super(props)

    const { src } = Entity.get(props.entityKey).getData()

    this.state = {
      src
    }

    this.onChange = (e) => this.setState({ src: e.target.value })
  }

  render() {
    const { editing, onBlur, onClick } = this.props
    const { src } = this.state

    const katex = <Katex src={src} />

    if (editing) {
      return (
        <Modal isOpen={editing}
               onAfterOpen={() => {
                 if (this.input) {
                   this.input.focus()
                 }
               }}
               onRequestClose={() => onBlur(src)}
               style={{ overlay: { zIndex: 99 } }}>
          {katex}
          <textarea ref={(c) => this.input = c}
                    onChange={this.onChange}
                    style={{
                      width: '100%',
                      height: '3em'
                    }}
                    value={src} />
        </Modal>
      )
    }

    return (
      <span onClick={onClick}>
        {katex}
      </span>
    )
  }
}

LatexInline.propTypes = {
  editing: PropTypes.bool.isRequired,
  entityKey: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func
}

class LatexEquation extends Component {
  render() {
    const { block, blockProps } = this.props

    const { src } = Entity.get(block.getEntityAt(0)).getData()
    const editing = blockProps.editing

    let editor

    if (editing) {
      editor = (
        <textarea autoFocus
                  onChange={blockProps.onChange}
                  onBlur={blockProps.onBlur}
                  style={{
                    width: '100%',
                    height: '3em'
                  }}
                  value={src} />
      )
    }

    return (
      <div>
        <Katex displayMode onClick={blockProps.onClick} src={src} />
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

    const decorator = new CompositeDecorator([{
      strategy: createEntityTypeStrategy('INLINE_LATEX_EQUATION'),
      component: (props) => {
        const { entityKey } = props // eslint-disable-line react/prop-types

        const editing = this.state.liveBlockEdits.get(entityKey, false)

        const onClick = () => {
          const { editorState, liveBlockEdits } = this.state

          this.setState({
            editorState: EditorState.forceSelection(editorState, editorState.getSelection()),
            liveBlockEdits: liveBlockEdits.set(entityKey, true)
          })
        }

        const onBlur = (src) => {
          const { editorState, liveBlockEdits } = this.state

          Entity.mergeData(entityKey, {
            src
          })

          this.setState({
            liveBlockEdits: liveBlockEdits.remove(entityKey),
            editorState: EditorState.forceSelection(editorState, editorState.getSelection())
          })
        }

        const newProps = {
          ...props,
          editing,
          onBlur,
          onClick
        }

        return <LatexInline {...newProps} />
      }
    }])

    const rawContent = props.storage.get()

    let editorState

    try {
      const content = convertFromRaw(rawContent)

      editorState = EditorState.createWithContent(content, decorator)
    } catch (e) {
      editorState = EditorState.createEmpty(decorator)
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

    this.addInlineLatexEquation = this.addInlineLatexEquation.bind(this)
  }

  blockRenderer(block) {
    switch (block.getType()) {
      case 'atomic': {
        const entityKey = block.getEntityAt(0)
        const entity = Entity.get(entityKey)

        switch (entity.getType()) {
          case 'LATEX_EQUATION':
            return {
              component: LatexEquation,
              editable: false,
              props: {
                editing: this.state.liveBlockEdits.get(entityKey, false),

                onBlur: () => {
                  const { editorState, liveBlockEdits } = this.state

                  this.setState({
                    liveBlockEdits: liveBlockEdits.remove(entityKey),
                    editorState: EditorState.forceSelection(editorState, editorState.getSelection())
                  })
                },

                onChange: (e) => {
                  const { editorState } = this.state

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
                    liveBlockEdits: liveBlockEdits.set(entityKey, true)
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

  addInlineLatexEquation() {
    const { editorState } = this.state

    const entityKey = Entity.create(
      'INLINE_LATEX_EQUATION',
      'IMMUTABLE',
      { src: 'x^2 + 5' }
    )

    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()

    const firstBlank = Modifier.insertText(
      contentState,
      selectionState,
      ' ',
      null,
      null
    )

    const withEntity = Modifier.insertText(
      firstBlank,
      selectionState,
      ' ',
      null,
      entityKey
    )

    const withBlank = Modifier.insertText(
      withEntity,
      selectionState,
      ' ',
      null,
      null
    )

    this.setState({
      liveBlockEdits: Map(),
      editorState: EditorState.push(editorState, withBlank, 'insert-text')
    })
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
        <button onClick={this.addInlineLatexEquation}>Insert Inline Equation</button>
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
