import React from 'react';
import Row from '../../Row';
import { useNodeChildrenIds, useOptions } from '../../hooks';

const Rows: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const rowIds = useNodeChildrenIds(nodeId);
  const options = useOptions();
  const RowComponent = options.components?.Row ?? Row;

  return (
    <div className="react-page-cell-rows">
      {rowIds.map((id) => (
        <RowComponent nodeId={id} key={id} />
      ))}
    </div>
  );
};

export default React.memo(Rows);
