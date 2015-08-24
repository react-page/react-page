import React from 'react';
import Plugin from 'app/service/plugin/Plugin';
import SectionModel from 'app/entity/Section';
import loader from 'app/pkg/loader';
import Reflux from 'reflux';

import './embed.css';

const Actions = Reflux.createActions(['change']);
const Store = Reflux.createStore({
    init () {
        this.listenTo(Actions.change, this.change);
    },
    change (value, id) {
        this.trigger({
            id: id,
            embed: value
        });
    }
});

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            embed: props.data.embed
        };
    }

    componentDidMount() {
        this.setChild(this.state);
        Store.listen((state) => {
            if (this.props.id === state.id) {
                this.setChild(state)
            }
        });
    }

    setChild(state) {
        var embed = React.findDOMNode(this.refs.embed),
            a = document.createElement('a');
        a.classList.add('embedly-card');
        a.href = state.embed;
        embed.replaceChild(a, embed.children[0]);
    }

    toggle() {
        if (this.state.focus) {
            this.props.plugin.blur(this);
        } else {
            this.props.plugin.focus(this);
        }
        this.setState({
            focus: !this.state.focus
        });
    }

    render() {
        return (
            /*jshint ignore:start */
            <div className="embed-container">
                <button className="config-toggler" onClick={this.toggle.bind(this)}>
                    <span className="fa fa-cog fa-2x"></span>
                </button>
                <div ref="embed" className="embed-body">
                    <div>PLACEHOLDER</div>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
}

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            embed: props.context.data.embed
        };
    }

    change(event) {
        var embed = event.target.value;
        this.setState({embed: embed});
        Actions.change(embed, this.props.context.id);
    }

    render() {
        return (
            /*jshint ignore:start */
            <input value={this.state.embed}
                   onChange={this.change.bind(this)}
                   className="embed-input" type="text"
                   placeholder="Enter the URL you want to embed.">
            </input>
            /*jshint ignore:end */
        );
    }
}

export default class Default extends Plugin {
    constructor() {
        super({
            name: 'embed',
            version: '0.0.1',
            section: Section,
            toolbar: Toolbar,
            create: function () {
                return new SectionModel(
                    this.name,
                    this.version,
                    this.args,
                    {
                        embed: 'https://soundcloud.com/majorlazer/major-lazer-dj-snake-lean-on-feat-mo'
                    }
                );
            },
            parse: function (section) {
                return {
                    embed: section.dataset.href
                };
            }
        });
    }
}
