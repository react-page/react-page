import pic01 from './images/pic01.jpg'
import pic02 from './images/pic02.jpg'
import pic03 from './images/pic03.jpg'
import pic04 from './images/pic04.jpg'

export default [
  {
    "id": "4",
    "cells": [
      {
        "id": "1fb5727a-266e-4a98-9b7f-14609e7fddaf",
        "inline": null,
        "size": 12,
        "rows": [
          {
            "id": "245eeba7-e7c5-4be5-92c1-f96b862d7b07",
            "cells": [
              {
                "id": "335bd954-f80b-4a64-ba94-bcecd6ed7ece",
                "inline": null,
                "size": 12,
                "content": {
                  "plugin": {
                    "name": "ory/editor/core/content/slate",
                    "version": "0.0.1"
                  },
                  "state": {
                    "serialized": {
                      "nodes": [
                        {
                          "kind": "block",
                          "type": "HEADINGS/HEADING-ONE",
                          "nodes": [
                            {
                              "kind": "text",
                              "text": "Hi, I'm an ORY Editor demo!"
                            }
                          ],
                          "data": {
                            "align": "center"
                          }
                        },
                        {
                          "kind": "block",
                          "type": "PARAGRAPH/PARAGRAPH",
                          "nodes": [
                            {
                              "kind": "text",
                              "text": "It's a fresh open source platform for creating better digital content."
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '5',
    cells: [{
      rows: [{
        cells: [{
          layout: {
            plugin: {
              name: 'example/layout/parallax'
            },
            state: { style: 1 }
          }, rows: [{
            cells: [{
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<h1>Lorem ipsum dolor adipiscing amet dolor consequat</h1><p>Adipiscing a commodo ante nunc accumsan et interdum mi ante adipiscing. A nunc lobortis non nisl amet vis sed volutpat aclacus nascetur ac non. Lorem curae et ante amet sapien sed tempus adipiscing id accumsan.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/image' },
                    state: {
                      src: pic01
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'example/layout/parallax'
            },
            state: { style: 2 }
          },
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: `
<h2>Lorem ipsum dolor adipiscing<br/>
amet dolor consequat</h2>
<p>Adipiscing a commodo ante nunc accumsan interdum mi ante adipiscing. A nunc lobortis non nisl amet vis
volutpat aclacus nascetur ac non. Lorem curae eu ante amet sapien in tempus ac. Adipiscing id accumsan
adipiscing ipsum.</p>
<p>Blandit faucibus proin. Ac aliquam integer adipiscing enim non praesent vis commodo nunc phasellus cubilia ac
risus accumsan. Accumsan blandit. Lobortis phasellus non lobortis dit varius mi varius accumsan lobortis.
Blandit ante aliquam lacinia lorem lobortis semper morbi col faucibus vitae integer placerat accumsan orci eu
mi odio tempus adipiscing adipiscing adipiscing curae consequat feugiat etiam dolore.</p>
<p>Adipiscing a commodo ante nunc accumsan interdum mi ante adipiscing. A nunc lobortis non nisl amet vis
volutpat aclacus nascetur ac non. Lorem curae eu ante amet sapien in tempus ac. Adipiscing id accumsan
adipiscing ipsum.</p>`
                }
              }
            }, {
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-code', style: '1' }
                  }
                }, {
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-bolt', style: '1' }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-camera-retro', style: '2' }
                  }
                }, {
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-cog', style: '3' }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-desktop', style: '4' }
                  }
                }, {
                  content: {
                    plugin: { name: 'example/content/fa-icon' },
                    state: { icon: 'fa-calendar', style: '5' }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'example/layout/parallax'
            },
            state: { style: 1, align: 'center' }
          }, rows: [{
            cells: [{
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<h1>Adipiscing amet consequat</h1><p>Ante nunc accumsan et aclacus nascetur ac ante amet sapien sed.</p>'
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/editor/core/content/image' },
                    state: {
                      src: pic02
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/image' },
                    state: {
                      src: pic03
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/image' },
                    state: {
                      src: pic04
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/editor/core/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'example/layout/parallax'
            },
            state: { style: 2, align: 'center' }
          },
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: `
<h2>Ipsum feugiat consequat?</h2>
<p>Sed lacus nascetur ac ante amet sapien.</p>
<p>SIGN UP | LEARN MORE</p>`
                }
              }
            }]
          }]
        }]
      }]
    }]
  }
]
