import slate from '@react-page/plugins-slate';
import { render } from 'enzyme';
import * as React from 'react';
import { CellPlugin, Plugins } from '../../core/types';
import { HTMLRenderer } from '../HTMLRenderer';

jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: (x) => x };
});

const Renderer: React.FC = ({ children }) => (
  <div className={`some-layout`}>{children}</div>
);

const someLayoutPlugin: CellPlugin = {
  id: 'layout',
  version: 1,
  Renderer: Renderer,
};

const plugins: Plugins = [slate(), someLayoutPlugin];

describe('HTMLRenderer', () => {
  describe('rendering html content from slate', () => {
    [
      {
        id: '1',
        version: 1,
        rows: [
          {
            id: 'someid',
            cells: [
              {
                id: '4c0f5ab5-f331-4d69-8850-7de0df917cc2',
                size: 12,

                plugin: {
                  id: 'ory/editor/core/content/slate',
                  version: 1,
                },
                dataI18n: {
                  en: {
                    slate: [
                      {
                        type: 'PARAGRAPH/PARAGRAPH',
                        children: [
                          {
                            text: 'Hello world, i am centered',
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
            ],
          },
        ],
      },
    ].forEach((c, k) => {
      describe(`case ${k}`, () => {
        const wrapper = render(<HTMLRenderer state={c} plugins={plugins} />);
        it('should pass', () => {
          expect(wrapper.html()).toEqual(
            // tslint:disable-next-line:max-line-length
            '<div class="react-page-cell react-page-cell-sm-12 react-page-cell-xs-12"><div class="react-page-cell-inner react-page-cell-leaf"><div data-gramm="false" data-slate-editor="true" data-slate-node="value" style="outline:none;white-space:pre-wrap;word-wrap:break-word"><p data-slate-node="element" style="text-align:center"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Hello world, i am centered</span></span></span></p></div></div></div>'
          );
        });
      });
    });
  });
});
