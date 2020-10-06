import * as React from 'react';

import { useCell } from '../../hooks';
import Content from '../Content';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import ErrorCell from '../ErrorCell';
import Layout from '../Layout';
import Rows from '../Rows';

const Inner: React.FC<{ nodeId: string }> = (props) => {
  const node = useCell(props.nodeId);
  const {
    rows = [],
    layout: { plugin: { Component: LayoutComponent = undefined } = {} } = {},
    content: { plugin: { Component: ContentComponent = undefined } = {} } = {},
  } = node;

  if (rows.length && LayoutComponent) {
    return (
      <Droppable {...props}>
        <Draggable {...props}>
          <Layout {...props} />
        </Draggable>
      </Droppable>
    );
  } else if (rows.length) {
    return (
      <Droppable {...props}>
        <Rows {...props} />
      </Droppable>
    );
  } else if (ContentComponent) {
    return (
      <Droppable {...props} isLeaf={true}>
        <Draggable {...props} isLeaf={true}>
          <Content {...props} />
        </Draggable>
      </Droppable>
    );
  }

  return (
    <ErrorCell
      node={node}
      error={new Error('The content plugin could not be found.')}
    />
  );
};

export default React.memo(Inner);
