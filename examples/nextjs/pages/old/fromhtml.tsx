import type { Cell, Value, Value_v0 } from '@react-page/editor';
import Editor, { migrateValue } from '@react-page/editor';
import type { SlateCellPlugin } from '@react-page/plugins-slate';
import type { GetStaticProps } from 'next';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import contents from '../../sampleContents/v0';
const LANGUAGES = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];

/*
importFromHtml was directly supported inside the Value of a slate plugin,
but we no longer support it, as it is not possible to code split that out and it needs
some libraries to work properly.

but its possible to transform html to a slate state using `createDataFromHtml`,
its just an async function instead of a sync function, because it lazy loads stuff

*/
const transformCell = async (cell: Cell): Promise<Cell> => {
  const plugin = cellPlugins.find(
    (c) => c.id === cell.plugin?.id
  ) as SlateCellPlugin;

  const transformedData = Object.fromEntries(
    await Promise.all(
      Object.entries(cell.dataI18n ?? {}).map(async ([lang, obj]) => {
        if (obj.importFromHtml && plugin) {
          return [
            lang,
            await plugin.createDataFromHtml(obj.importFromHtml as string),
          ];
        }
        return [lang, obj];
      })
    )
  );
  return {
    ...cell,
    rows: cell.rows ? await transformRows(cell.rows) : null,
    dataI18n: transformedData,
  };
};
const transformCells = async (cells: Cell[]) => {
  return Promise.all(cells.map(transformCell));
};
const transformRows = async (rows: Value['rows']) => {
  return Promise.all(
    rows.map(async (r) => ({
      ...r,
      cells: await transformCells(r.cells),
    }))
  );
};
export const getStaticProps: GetStaticProps<{
  content: Value | null;
}> = async () => {
  const contentRaw = migrateValue(contents[1], { cellPlugins, lang: 'en' });

  return {
    props: {
      content: contentRaw
        ? {
            ...contentRaw,
            rows: await transformRows(contentRaw.rows),
          }
        : null,
    },
  };
};

export default function Home({ content }: { content: Value | null }) {
  const [value, setValue] = useState<Value_v0 | Value | null>(content);

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </PageLayout>
  );
}
