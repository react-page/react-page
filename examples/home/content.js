const content = {
  [0]: {
    id: '4',
    cells: [{
      rows: [{
        cells: [{
          size: 2,
          content: {
            plugin: { name: 'ory/editor/core/content/spacer' },
            state: {}
          }
        }, {
          size: 8,
          content: {
            plugin: { name: 'ory/editor/core/content/slate' },
            state: {
              importFromHtml: '<h3>Start editing now.</h3>'
            }
          }
        }, {
          size: 2,
          content: {
            plugin: { name: 'ory/editor/core/content/spacer' },
            state: {}
          }
        }]
      }, {
        cells: [{
        content: {
          plugin: { name: 'ory/editor/core/content/slate' },
          state: {
            importFromHtml: '<p>The Ory Editor is part of the Ory Content Toolchain, a set of tools helping you to build, distribute and manage awesome content. With state of the art in browser technology and well designed systems architecture, you can finally say goodbye to hacks, html purifiers, steep learning curves, poor markup and complex plugin APIs.</p>'
          }
        }
        }]
      }, {
        cells: [{
          content: {
            plugin: { name: 'ory/editor/core/content/spacer' },
            state: {
              height: 60
            }
          }
        }]
      }, {
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/image' },
                state: {
                  src: './images/screenshot.png'}
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<h3>Work in context</h3>'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<p>The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Aenean eu justo sed elit dignissim aliquam. Mauris id fermentum nulla. Phasellus sodales massa malesuada tellus fringilla, nec bibendum tellus blandit.</p>'
                }
              }
            }]
          }],
        }, {
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/image' },
                state: {
                  src: './images/screenshot.png'}
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<h3>Build layouts</h3>'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<p>The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Aenean eu justo sed elit dignissim aliquam. Mauris id fermentum nulla. Phasellus sodales massa malesuada tellus fringilla, nec bibendum tellus blandit.</p>'
                }
              }
            }]
          }],
        }, {
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/image' },
                state: {
                  src: './images/screenshot.png'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<h3>Collaborate</h3>'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/editor/core/content/slate' },
                state: {
                  importFromHtml: '<p>The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Aenean eu justo sed elit dignissim aliquam. Mauris id fermentum nulla. Phasellus sodales massa malesuada tellus fringilla, nec bibendum tellus blandit.</p>'
                }
              }
            }]
          }],
        }]
      }]
    }]
  }
}

export class StaticContent {
  fetch(element: Object) {
    const id = element.dataset.editable
    return content[id]
  }

  store(state: Object) {
    console.log(state)
  }
}
