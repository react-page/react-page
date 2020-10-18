import { CellPlugin } from '@react-page/core/src';
import slate from '@react-page/plugins-slate';
import { render } from 'enzyme';
import * as React from 'react';
import { HTMLRenderer } from '../index';

jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: (x) => x };
});

const Layout: React.FC = ({ children }) => (
  <div className={`some-layout`}>{children}</div>
);

const someLayoutPlugin: CellPlugin = {
  id: 'layout',
  version: '0.0.1',
  Component: Layout,
};

const plugins = [slate(), someLayoutPlugin];

describe('HTMLRenderer', () => {
  describe('rendering html content from slate', () => {
    [
      {
        id: '1',
        version: '1.0.0',
        cells: [
          {
            id: '4c0f5ab5-f331-4d69-8850-7de0df917cc2',
            size: 12,

            plugin: {
              id: 'ory/editor/core/content/slate',
              version: '0.0.1',
            },
            dataI18n: {
              en: {
                serialized: {
                  nodes: [
                    {
                      kind: 'block',
                      type: 'PARAGRAPH/PARAGRAPH',
                      nodes: [
                        {
                          kind: 'text',
                          text: 'Asdfg',
                        },
                      ],
                      data: {
                        align: 'center',
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    ].forEach((c, k) => {
      describe(`case ${k}`, () => {
        const wrapper = render(<HTMLRenderer state={c} plugins={plugins} />);
        it('should pass', () => {
          expect(wrapper.html()).toEqual(
            // tslint:disable-next-line:max-line-length
            '<div class="ory-cell ory-cell-sm-12 ory-cell-xs-12"><div class="ory-cell-inner ory-cell-leaf"><div data-gramm="false" data-slate-editor="true" data-slate-node="value" style="outline:none;white-space:pre-wrap;word-wrap:break-word"><p data-slate-node="element" style="text-align:center"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Asdfg</span></span></span></p></div></div></div>'
          );
        });
      });
    });
  });
});
