import React from 'react';
import { useMeasure } from 'react-use';
import Cell from '../Cell';

type Props = {
  nodeId: string;
  rowHasInlineChildrenPosition?: string | null;
  isLast: boolean;
};
const ResizableRowCell: React.FC<Props> = ({ nodeId }) => {
  const [ref] = useMeasure();

  return (
    <>
      <Cell nodeId={nodeId} measureRef={ref} />
    </>
  );
};

export default React.memo(ResizableRowCell);
