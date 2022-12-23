import React from 'react';
import Row from '../../Row';
import { useNodeChildrenIds } from '../../hooks';

const Rows: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const rowIds = useNodeChildrenIds(nodeId);

  return (
    <>
      {rowIds.map((id) => (
        <Row nodeId={id} key={id} />
      ))}
    </>
  );
};

export default React.memo(Rows);
