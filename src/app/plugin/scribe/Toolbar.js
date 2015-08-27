import React from 'react';
import map from 'lodash/collection/map';
import Actions from './Actions';

export default class Toolbar extends React.Component {
    createListButton(index, outer) {
        var cn = 'fa fa-list' + (outer === 'ul' ? '' : '-ol');
        return (
            /*jshint ignore:start */
            <button key={index+1} className="btn btn-primary" onMouseDown={this.listAction(outer).bind(this)}>
                <span className={cn}></span>
            </button>
            /*jshint ignore:end */
        );
    }

    toolbarAction(action) {
        Actions.action.triggerAction(action);
    }

    listAction(outer) {
        outer = outer === 'ul' ? 'ul' : 'ol';
        return function (event) {
            var outer = document.createElement(outer || 'ul'),
                inner = document.createElement('li');
            event.preventDefault();
            outer.appendChild(inner);
            this.state.instance.focus();
            this.state.instance.insertHtml(outer);
        }.bind(this);
    }

    render() {
        // var buttons = [];
        // u.each(this.props.actions, (k, v) => buttons.push(this.createButton(k, v)));
        // buttons.push(this.createListButton(buttons.length, 'ul'));
        // buttons.push(this.createListButton(buttons.length, 'ol'));

        return (
            /*jshint ignore:start */
            <div>
                { map(this.props.actions, (action, i) => {
                    return (
                        <div key={i} className="toolbar-button">
                            <div className="toolbar-button-inner"
                                    onMouseDown={() => {this.toolbarAction(action)}}>
                                <span className={action.icon}></span>
                            </div>
                        </div>
                    );
                })}
            </div>
            /*jshint ignore:end */
        );
    }
}

Toolbar.defaultProps = {
    actions: [
        {invoke: 'bold', icon: 'fa fa-bold', shortcut: 'ctrl+b'},
        {invoke: 'italic', icon: 'fa fa-italic', shortcut: 'ctrl+i'}
    ]
};
