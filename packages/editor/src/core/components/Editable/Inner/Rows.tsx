import React from 'react';
import InsertNew from '../../Cell/InsertNew';
import { useCellSpacing, useOption, useValueNode } from '../../hooks';
import Row from '../../Row';

const Rows: React.FC = () => {
  const { rowIds } = useValueNode((editable) => ({
    rowIds: editable?.rows?.map((c) => c.id) ?? [],
  }));

  const childConstraints = useOption('childConstraints');
  const components = useOption('components');

  const { y: cellSpacingY } = useCellSpacing();
  const insertAllowed = childConstraints?.maxChildren
    ? childConstraints?.maxChildren > rowIds.length
    : true;

  const InsertNewWithDefault = components?.InsertNew ?? InsertNew;

  return (
    <>
      {rowIds.length > 0 ? (
        <div
          style={
            cellSpacingY !== 0
              ? { margin: `${-cellSpacingY / 2}px 0` }
              : undefined
          }
        >
          {rowIds.map((id) => (
            <Row nodeId={id} key={id} />
          ))}
        </div>
      ) : null}
      {insertAllowed ? <InsertNewWithDefault childrenIds={rowIds} /> : null}
    </>
  );
};

export default React.memo(Rows);
