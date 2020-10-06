import * as React from 'react';
import { useCell } from '../../..';
import Row from '../../../components/Row';

const Rows: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const cell = useCell(nodeId);
  const { rows = [] } = cell;

  return (
    <div className="ory-cell-inner ory-cell-rows">
      {rows.map((r) => (
        <Row nodeId={r.id} key={r.id} />
      ))}
    </div>
  );
};

export default React.memo(Rows);
