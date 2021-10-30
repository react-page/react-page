import { createValue } from '../..';
import type { CellPlugin, PartialCell, Value } from '../types';
import { getTextContents } from './getTextContents';

const customCellPlugin1: CellPlugin<{
  title: string;
  description: string;
}> = {
  id: 'p1',
  Renderer: () => null,
  version: 1,
  getTextContents: (data) => [data.title, data.description],
};

const customCellPlugin2: CellPlugin<{
  imageUrl: string;
}> = {
  id: 'p2',
  Renderer: () => null,
  version: 1,
};

const customCellPlugin3: CellPlugin<{
  text: string[];
  title: string;
}> = {
  id: 'p3',
  Renderer: () => null,
  version: 1,
  getTextContents: (data) => [data.title, ...data.text],
};

const cellPlugins = [customCellPlugin1, customCellPlugin2, customCellPlugin3];

describe('getTextContents', () => {
  const sampleValue: Value = createValue(
    {
      rows: [
        [
          {
            plugin: customCellPlugin1,
            data: {
              title: 'my title',
              description: 'my description',
            },
          },
          {
            plugin: customCellPlugin2,
            data: {
              imageUrl: 'fooo.bar',
            },
          },
        ],
        [
          {
            rows: [
              [
                {
                  plugin: customCellPlugin3,
                  data: {
                    title: 'hello',
                    text: ['world', 'echo'],
                  },
                },
              ],
            ],
          },
        ],
      ],
    },
    {
      lang: 'en',
      cellPlugins,
    }
  );

  it('extracts getTextContents from Cell Plugins', () => {
    expect(
      getTextContents(sampleValue, {
        cellPlugins,
        lang: 'en',
      })
    ).toEqual(['my title', 'my description', 'hello', 'world', 'echo']);
  });
});
