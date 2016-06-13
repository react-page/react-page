import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverCell, cancelCellDrag, dropCell, dragCell} from 'src/common/actions/cell'
import {rowAncestorHover} from 'src/common/actions/row'
import throttle from 'lodash.throttle'
import {isLayoutMode} from 'src/common/selectors/mode'
import tinycolor from 'tinycolor2'
import './cell.css'

const computeLevel = (props, monitor, component) => {
    const treshold = 0.40
    const mousePosition = monitor.getClientOffset()
    const componentPosition = findDOMNode(component).getBoundingClientRect()
    const componentHeight = (componentPosition.bottom - componentPosition.top)
    const componentWidth = (componentPosition.right - componentPosition.left)
    const relVer = ( mousePosition.y - componentPosition.top) / componentHeight
    const relHor = (mousePosition.x - componentPosition.left) / componentWidth

    let position = 'center'
    let level = 0
    if (relVer <= treshold || relVer >= 1 - treshold) {
        if (componentPosition.bottom - mousePosition.y > componentHeight / 2) {
            level = (mousePosition.y - componentPosition.top) / (componentHeight * treshold / props.parents.length)
            position = 'top'
        } else {
            level = (componentPosition.bottom - mousePosition.y) / (componentHeight * treshold / props.parents.length)
            position = 'bottom'
        }
        level = props.parents.length - Math.round(level)
    } else if (relHor <= treshold || relHor >= 1 - treshold) {
        if (componentPosition.right - mousePosition.x > componentWidth / 2) {
            level = (mousePosition.x - componentPosition.left) / (componentWidth * treshold / props.parents.length)
            position = 'left'
        } else {
            level = (componentPosition.right - mousePosition.x) / (componentWidth * treshold / props.parents.length)
            position = 'right'
        }
        level = props.parents.length - Math.round(level)
    }
    return { level, position }
}

const cellTarget = {
    hover: throttle((props, monitor, component) => {
        const item = monitor.getItem()
        if (item.id === props.id) {
            return
        } else if (!monitor.isOver({ shallow: true })) {
            return
        } else if (!Boolean(props.id)) {
            return
        }

        const { position, level } = computeLevel(props, monitor, component)
        props.hoverCellOverCell({
            item: item,
            hover: props,
            position,
            level
        })
    }, 200, { leading: true, trailing: false }),

    drop(props, monitor, component) {
        const item = monitor.getItem()
        const { position, level } = computeLevel(props, monitor, component)
        if (item.id === props.id) {
            props.cancelCellDrag(item.id)
        } else {
            props.dropCell({
                hover: props,
                item,
                position,
                level
            })
        }
    }
}

const cellSource = {
    beginDrag(props) {
        // delay drag propagation or risk a bug with react-dnd html5 backend
        setTimeout(() => props.dragCell(props), 50)
        return { ...props };
    },

    endDrag(props, monitor) {
        if (monitor.didDrop()) {
            return
        }
        props.cancelCellDrag(props.id)
    }
};

const dnd = {
    connect: (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    collect: (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })
}

const inner = ({ rows = [], level, plugin, data, id, path, isEditView, ...props }) => {
    if (rows.length > 0) {
        return (
            <div>
                {
                    rows.map((row, position) => <Row path={path} parent={id} key={row.id}
                                                     level={level + 1} {...row} />)
                }
            </div>
        )
    }

    if (!Boolean(plugin)) {
        console.log('Neither rows nor plugin defined in object', { rows, plugin, data, id, path, ...props })
        return <div style={{backgroundColor: 'red', padding: '16px', margin: '8px', borderRadius: '4px'}}>Empty
            row</div>
    }

    const { EditView, RenderView } = plugin
    return (
        <div>
            {
                isEditView ? <EditView {...data} id={id}/>
                    : <RenderView {...data} id={id}/>
            }
        </div>
    )
}

const PlaceHolder = ({ id, width, isOverCurrent, connectDropTarget, level = 1 }) => {
    if (isOverCurrent) {

    }
    const style = {
        float: 'left',
        width,
        minHeight: '14px',
        backgroundColor: isOverCurrent ? 'yellow' : tinycolor('#305010').lighten(level).toString(),
        boxShadow: '0 0 2px 2px',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: '2px',
        overflow: 'hidden'
    }
    return connectDropTarget(
        <div {...{ style }} />
    )
}

const cap = (s) => (s || '').charAt(0).toUpperCase() + (s || '').slice(1)

class Cell extends Component {
    render() {
        const { level, wrap, isLayoutMode, hover, isOverCurrent, isDragging, isPlaceholder, connectDragSource, connectDropTarget, size, siblings = [], rows = [], ...props } = this.props
        const cellProps = {
            className: `col-md-${size}`,
            style: {
                //width: !isDragging && isLayoutMode ? `calc(${size / 12 * 100}% - 30px)` : null,
                //padding: !isDragging && isLayoutMode ? '0 16px' : null,
                opacity: isDragging ? '.3' : '1'
                //outline: '1px solid #aaa'
                //borderRadius: '4px',
                //background: isOverCurrent ? ' rgba(255,255,255,1) 72%, rgba(188,224,238,1) 100%);' : null
                // [`margin${cap(hover)}`]: Boolean(hover) ? `-2px` : null
            }
        }

        let helper = null
        if (hover === 'center') {
            helper = (
                <div style={{
        boxShadow: 'inset 0px 0px 17px 10px #aaa',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 9999,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        }}></div>
            )
        } else if (Boolean(hover)) {
            cellProps.className += ` drag-hover drag-hover-${hover}`
        }

        // only leafs can be dropped onto
        let connect = (e) => connectDragSource(connectDropTarget(e))
        if (rows.length > 0) {
            connect = (e) => (e)
        }

        if (isPlaceholder) {
            return <PlaceHolder {...{
                ...props,
                level,
                width: siblings.length > 0 ? '16px' : '100%',
                isOverCurrent,
                connectDropTarget
            }} />
        }

        if (Boolean(wrap)) {
            const { component: WrapComponent = 'div', props: wrapProps = {} } = wrap
            return connect(
                <div {...cellProps}>
                    <WrapComponent {...wrapProps}>
                        {inner({ ...props, rows })}
                    </WrapComponent>
                </div>
            )
        }

        return connect(
            <div{...cellProps}>
                {inner({ ...props, rows })}
            </div>
        )
    }
}

Cell.propTypes = {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    hoverCellOverCell: PropTypes.func.isRequired,
    cancelCellDrag: PropTypes.func.isRequired,
    rowAncestorHover: PropTypes.func.isRequired,
    dragCell: PropTypes.func.isRequired,
    dropCell: PropTypes.func.isRequired,
    isLayoutMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
    isLayoutMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    hoverCellOverCell,
    cancelCellDrag,
    rowAncestorHover,
    dropCell,
    dragCell
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))