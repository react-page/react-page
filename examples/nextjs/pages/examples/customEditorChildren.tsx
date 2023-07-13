import type { Value } from '@react-page/editor';
import Editor, {
  useInsertNew,
  useSetPreviewMode,
  useSetEditMode,
  useUndo,
} from '@react-page/editor';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

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

function Toolbar() {
  const insert = useInsertNew();
  const setIsPreviewMode = useSetPreviewMode();
  const setEditMode = useSetEditMode();
  const setUndo = useUndo();

  function addSlate() {
    insert({ plugin: 'ory/editor/core/content/slate' });
  }

  function previewMode() {
    setIsPreviewMode();
  }

  function editMode() {
    setEditMode();
  }

  function callUndo() {
    setUndo();
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
      <Button
        onClick={callUndo}
        color={'primary'}
        variant={'contained'}
        style={{ marginRight: '10px' }}
      >
        Undo
      </Button>
    </div>
  );
}

export default function Example() {
  const [value, setValue] = useState<Value | null>(null);

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
