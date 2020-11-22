import { render } from 'enzyme';
import * as React from 'react';
import { CellPlugin } from '../../core/types';
import { HTMLRenderer } from '../HTMLRenderer';

jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: (x) => x };
});

const somePlugin: CellPlugin<{ text: string }> = {
  id: 'somePlugin',
  version: 1,
  Renderer: (props) => <p>{props.data.text}</p>,
};

const cellPlugins: CellPlugin[] = [somePlugin];

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
                  id: 'somePlugin',
                  version: 1,
                },
                dataI18n: {
                  en: {
                    text: 'Hello world',
                  },
                },
              },
            ],
          },
        ],
      },
    ].forEach((c, k) => {
      describe(`case ${k}`, () => {
        const wrapper = render(
          <HTMLRenderer state={c} cellPlugins={cellPlugins} />
        );
        it('should pass', () => {
          expect(wrapper.html()).toEqual(
            // tslint:disable-next-line:max-line-length
            '<div class="react-page-cell react-page-cell-sm-12 react-page-cell-xs-12"><div class="react-page-cell-inner react-page-cell-leaf"><p>Hello world</p></div></div>'
          );
        });
      });
    });
  });
});
