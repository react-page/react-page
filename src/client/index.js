import React from 'react'
import ReactDOM from 'react-dom'
import {forEach} from 'ramda'
import uuid from 'node-uuid'
import TextArea from 'src/common/Plugins/TextArea'
import Spacer from 'src/common/Plugins/Spacer'

const renderComponent = (component, element) => ReactDOM.render(component, element)

const dummyContent = [
    {
        id: uuid.v4(),
        rows: [
            {
                id: uuid.v4(),
                cells: [
                    {
                        plugin: TextArea,
                        data: {
                            content: 'cool content bro'
                        }
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null
                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [
                                    {
                                        plugin: TextArea,
                                        data: {
                                            content: ' cool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content brocool content bro'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        rows: [
                                            {
                                                id: uuid.v4(),
                                                cells: [
                                                    {
                                                        id: uuid.v4(),
                                                        rows: [
                                                            {
                                                                id: uuid.v4(),
                                                                cells: [
                                                                    {
                                                                        id: uuid.v4(),
                                                                        plugin: TextArea,
                                                                        data: {
                                                                            content: 'nested gosu $$$'
                                                                        }
                                                                    },]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },]
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid.v4(),
                wrap: {
                    component: 'div',
                    props: {
                        style: {
                            backgroundColor: null,

                        }
                    }
                },
                cells: [
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                wrap: {
                                    component: 'div',
                                    props: {
                                        style: {}
                                    }
                                },
                                id: uuid.v4(),
                                cells: [{
                                    plugin: TextArea,
                                    data: {
                                        content: 'cool content bro'
                                    }
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid.v4(),
                        rows: [
                            {
                                id: uuid.v4(),
                                cells: [
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'left'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: Spacer,
                                        data: {
                                            height: '15'
                                        }
                                    },
                                    {
                                        id: uuid.v4(),
                                        plugin: TextArea,
                                        data: {
                                            content: 'right'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

let render = (elements) => {
    const Editor = require('src/common').default

    forEach((element) => renderComponent(<Editor content={dummyContent[element.dataset.id]}/>, element), elements)
}

if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
        const RedBox = require('redbox-react')
        renderComponent(<RedBox error={error}/>, document.getElementById("app"))
    }

    render = (elements) => {
        try {
            renderApp(elements)
        } catch (error) {
            renderError(error)
        }
    }

    module.hot.accept('src/common', () => {
        setTimeout(render)
    })
}

render(document.querySelectorAll('.editable'))
