import React from 'react';
import Editor, {
  Value,
  AutoForm,
  AutoFields,
  makeUniformsSchema,
} from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import background from '@react-page/plugins-background';
import PageLayout from '../../components/PageLayout';

// Define which plugins we want to use.
const cellPlugins = [slate(), image, background({})];

interface CellSpacingState {
  value?: Value;
  outlineEditor?: boolean;
  outlineCells?: boolean;
  cellSpacingX?: string;
  cellSpacingY?: string;
}

// Remove samples stylesheet cell padding and optionally outline cell and editor boundaries.
function styles(state: CellSpacingState) {
  let styles = '.react-page-cell-inner-leaf { padding: 0; }';

  if (state.outlineCells) {
    styles += '.react-page-cell-inner > div { outline: 1px solid red; }';
  }

  if (state.outlineEditor) {
    styles += '.react-page-editable { outline: 1px solid green; }';
  }

  return styles;
}

export default function CellSpacing() {
  const [state, setState] = React.useState<CellSpacingState>({
    cellSpacingX: '10',
    cellSpacingY: '10',
  });

  const style = React.useMemo(
    () => <style dangerouslySetInnerHTML={{ __html: styles(state) }} />,
    [state.outlineCells, state.outlineEditor]
  );

  const schema = makeUniformsSchema({
    type: 'object',
    properties: {
      outlineEditor: { type: 'boolean', title: 'Outline the Editor in Green' },
      outlineCells: { type: 'boolean', title: 'Outline Cells in Red' },
      cellSpacingX: { type: 'string', title: 'Horizontal Cell Spacing' },
      cellSpacingY: { type: 'string', title: 'Vertical Cell Spacing' },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

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
              columnCount: 3,
              columnGap: 48,
            }}
          >
            <AutoFields />
          </div>
        </AutoForm>
      </div>

      <Editor
        cellPlugins={cellPlugins}
        value={state.value}
        onChange={(value) => setState((s) => ({ ...s, value }))}
        // let's also test our ability to survive non-numbers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellSpacing={[state.cellSpacingX as any, state.cellSpacingY as any]}
      />
    </PageLayout>
  );
}
