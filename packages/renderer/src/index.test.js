import { mount } from 'enzyme'
import React from 'react'
import { HTMLRenderer } from './index.js'

const plugins = {
  content: [], layout: [{
    name: 'layout',
    version: '0.0.1',
    Component: ({ children, state: { className } }) => {
      return <div className={`${className}`}>{children}</div>
    }
  }]
}

describe('HTMLRenderer', () => {
  // describe('single content cell', () => {
  //   const state = {
  //     id: '1',
  //     cells: [{
  //       id: '2',
  //       content: {
  //         plugin: {
  //           name: 'ory/editor/core/default'
  //         },
  //         state: {
  //           value: 'Lorem ipsum dolor sit amet.'
  //         }
  //       }
  //     }]
  //   }
  //
  //   it('should render "lorem ipsum"', () => {
  //     const wrapper = mount(<HTMLRenderer state={state} plugins={plugins}/>)
  //     expect(wrapper.text()).toContain('Lorem ipsum')
  //   })
  // })
  //
  // describe('layout > content cell', () => {
  //   const state = {
  //     id: '1',
  //     cells: [{
  //       id: '2',
  //       layout: {
  //         plugin: {
  //           name: 'layout'
  //         },
  //         state: {
  //           className: 'layout-state'
  //         }
  //       },
  //       rows: [{
  //         cells: [{
  //           content: {
  //             plugin: {
  //               name: 'ory/editor/core/default'
  //             },
  //             state: {
  //               value: 'Lorem ipsum dolor sit amet.'
  //             }
  //           }
  //         }]
  //       }]
  //     }]
  //   }
  //
  //   const wrapper = mount(<HTMLRenderer state={state} plugins={plugins}/>)
  //   it('should contain "lorem ipsum"', () => {
  //     expect(wrapper.text()).toContain('Lorem ipsum')
  //   })
  //   it('should render the layout cell cell', () => {
  //     expect(wrapper.find('.layout-state')).toHaveLength(1)
  //   })
  // })
  //
  // describe('two content cells', () => {
  //   const state = {
  //     id: '1',
  //     cells: [{
  //       content: {
  //         plugin: {
  //           name: 'ory/editor/core/default'
  //         },
  //         state: {
  //           value: 'Lorem ipsum.'
  //         }
  //       }
  //     }, {
  //       content: {
  //         plugin: {
  //           name: 'ory/editor/core/default'
  //         },
  //         state: {
  //           value: 'dolor sit amet.'
  //         }
  //       }
  //     }]
  //   }
  //
  //   const wrapper = mount(<HTMLRenderer state={state} plugins={plugins}/>)
  //   it('should contain "lorem ipsum." and "dolor sit amet."', () => {
  //     expect(wrapper.text()).toContain('Lorem ipsum.')
  //     expect(wrapper.text()).toContain('dolor sit amet.')
  //   })
  //   it('should set the correct sizes although no sizes were given', () => {
  //     expect(wrapper.find('.ory-cell-md-6')).toHaveLength(2)
  //   })
  // })

  describe('two inlining content cells', () => {
    const state = {
      id: '1',
      cells: [{
        rows: [
          {
            cells: [{
              content: { plugin: { name: 'ory/editor/core/default' }, state: { value: 'Lorem ipsum.' } },
              inline: 'left'
            }, {
              content: { plugin: { name: 'ory/editor/core/default' }, state: { value: 'dolor sit amet.' } }
            }]
          }
        ]
      }]
    }

    const wrapper = mount(<HTMLRenderer state={state} plugins={plugins}/>)
    it('should contain "lorem ipsum." and "dolor sit amet."', () => {
      expect(wrapper.text()).toContain('Lorem ipsum.')
      expect(wrapper.text()).toContain('dolor sit amet.')
    })
    it('should set up inlining correctly for ory-cell-md-6', () => {
      expect(wrapper.find('.ory-cell-md-6')).toHaveLength(1)
    })
    it('should set up inlining correctly for ory-cell-md-12', () => {
      expect(wrapper.find('.ory-cell-md-12')).toHaveLength(2)
    })
    it('should set up inlining correctly for ory-cell-has-inline-neighbour', () => {
      expect(wrapper.find('.ory-cell-has-inline-neighbour')).toHaveLength(1)
    })
    it('should set up inlining correctly for ory-row-has-floating-children', () => {
      expect(wrapper.find('.ory-row-has-floating-children')).toHaveLength(1)
    })
  })
})
