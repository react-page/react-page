import React from 'react';
import { SlateReactPresentation } from 'slate-react-presentation';
import type { SlateProps } from '../types/component';
import { useRenderElement, useRenderLeave } from './renderHooks';

const ReadOnlySlate = (props: SlateProps) => {
  const { plugins, defaultPluginType } = props;

  const renderElement = useRenderElement(
    {
      plugins,
      defaultPluginType,
    },
    []
  );
  const renderLeaf = useRenderLeave({ plugins, readOnly: true }, []);
  // the div around is required to be consistent in styling with the default editor
  return (
    <div
      style={{
        position: 'relative',
        outline: 'none',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
      }}
    >
      <SlateReactPresentation
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        value={props.data.slate}
        LeafWrapper={React.Fragment}
      />
    </div>
  );
};

export default React.memo(ReadOnlySlate);
