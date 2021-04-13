import React from 'react';
import type { Value } from '@react-page/editor';
import Editor, {
  AutoForm,
  AutoFields,
  makeUniformsSchema,
} from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import customLayout from '../../plugins/customLayoutPluginWithCellSpacing';
import PageLayout from '../../components/PageLayout';
import { cellSpacingDemo } from '../../sampleContents/cellSpacing';

// Define which plugins we want to use.
const cellPlugins = [slate(), image, customLayout];

interface CellSpacingState {
  value?: Value;
  readOnly?: boolean;
  outlineEditor?: boolean;
  outlineCells?: boolean;
  cellSpacingX?: number;
  cellSpacingY?: number;
}

// Remove samples stylesheet cell padding and optionally outline cell and editor boundaries.
function styles(state: CellSpacingState) {
  let styles = '.react-page-cell-inner-leaf { padding: 0; }';

  if (state.outlineCells) {
    styles += '.react-page-cell-inner { outline: 1px solid red !important; }';
  }

  if (state.outlineEditor) {
    styles += '.editor { outline: 2px solid green; }';
  }

  return styles;
}

export default function CellSpacing() {
  const [state, setState] = React.useState<CellSpacingState>({
    value: cellSpacingDemo,
    outlineEditor: true,
    outlineCells: true,
    cellSpacingX: 10,
    cellSpacingY: 10,
  });

  const style = React.useMemo(
    () => <style dangerouslySetInnerHTML={{ __html: styles(state) }} />,
    [state.outlineCells, state.outlineEditor]
  );

  const schema = makeUniformsSchema<{
    outlineEditor: boolean;
    outlineCells: boolean;
    readOnly: boolean;
    cellSpacingX: number;
    cellSpacingY: number;
  }>({
    properties: {
      outlineEditor: { type: 'boolean', title: 'Outline the Editor in Green' },
      outlineCells: { type: 'boolean', title: 'Outline Cells in Red' },
      readOnly: { type: 'boolean', title: 'Read Only' },
      cellSpacingX: { type: 'integer', title: 'Horizontal Cell Spacing' },
      cellSpacingY: { type: 'integer', title: 'Vertical Cell Spacing' },
    },
  });

  return (
    <PageLayout>
      {style}

      <div
        style={{
          padding: '20px',
          marginBottom: '20px',
          outline: '1px solid #E0E0E0',
        }}
      >
        <AutoForm
          model={state}
          autosave={true}
          schema={schema}
          onSubmit={(val: Partial<CellSpacingState>) =>
            setState((s) => ({ ...s, ...val }))
          }
        >
          <div
            style={{
              display: 'flex',
              maxWidth: 600,
            }}
          >
            <AutoFields
              fields={['readOnly', 'outlineEditor', 'outlineCells']}
            />
            <AutoFields fields={['cellSpacingX', 'cellSpacingY']} />
          </div>
        </AutoForm>
      </div>

      <div
        className="editor"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Editor
          readOnly={state.readOnly}
          cellPlugins={cellPlugins}
          value={state.value}
          onChange={(value) => setState((s) => ({ ...s, value }))}
          cellSpacing={{ x: state.cellSpacingX, y: state.cellSpacingY }}
        />
      </div>
    </PageLayout>
  );
}
