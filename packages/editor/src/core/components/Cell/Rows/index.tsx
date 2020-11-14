import * as React from 'react';
import Row from '../../Row';
import { useNodeChildrenIds } from '../../hooks';

const Rows: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const rowIds = useNodeChildrenIds(nodeId);

  return (
    <div className="react-page-cell-inner react-page-cell-rows">
      {rowIds.map((id) => (
        <Row nodeId={id} key={id} />
      ))}
    </div>
  );
};

export default React.memo(Rows);
