import * as React from 'react';
import { useCell } from '../../..';
import Row from '../../../components/Row';
import { useNodeChildrenIds } from '../../hooks';

const Rows: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const rowIds = useNodeChildrenIds(nodeId);

  return (
    <div className="ory-cell-inner ory-cell-rows">
      {rowIds.map((id) => (
        <Row nodeId={id} key={id} />
      ))}
    </div>
  );
};

export default React.memo(Rows);
