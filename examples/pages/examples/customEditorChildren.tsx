import type { Value, Options } from '@react-page/editor';
import Editor, {
  useInsertNew,
  useSetPreviewMode,
  useSetEditMode,
} from '@react-page/editor';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const LANGUAGES: Options['languages'] = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];

function Toolbar() {
  const insert = useInsertNew();
  const setIsPreviewMode = useSetPreviewMode();
  const setEditMode = useSetEditMode();

  function addSlate() {
    insert({ plugin: 'ory/editor/core/content/slate' });
  }

  function previewMode() {
    setIsPreviewMode();
  }

  function editMode() {
    setEditMode();
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button
        onClick={addSlate}
        startIcon={<Add />}
        color={'primary'}
        variant={'contained'}
        style={{ marginRight: '10px' }}
      >
        Add slate
      </Button>
      <Button
        onClick={previewMode}
        color={'primary'}
        variant={'contained'}
        style={{ marginRight: '10px' }}
      >
        Preview Mode
      </Button>
      <Button
        onClick={editMode}
        color={'primary'}
        variant={'contained'}
        style={{ marginRight: '10px' }}
      >
        Edit Mode
      </Button>
    </div>
  );
}

export default function Example() {
  const [value, setValue] = useState<Value>(null);

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        hideEditorSidebar={true}
        lang={LANGUAGES[0].lang}
        onChange={setValue}
        languages={LANGUAGES}
      >
        <Toolbar />
      </Editor>
    </PageLayout>
  );
}
