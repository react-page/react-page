import IconRedo from '@mui/icons-material/Redo';
import IconUndo from '@mui/icons-material/Undo';
import { Box } from '@mui/material';
import React from 'react';
import {
  useCanRedo,
  useCanUndo,
  useRedo,
  useUndo,
} from '../../../core/components/hooks';
import Button from '../Button/index';

type Props = {
  labelUndo: string;
  labelRedo: string;
};
const UndoRedo: React.FC<Props> = ({ labelUndo, labelRedo }) => {
  const undo = useUndo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const redo = useRedo();
  return (
    <Box
      sx={{
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <Button
        active
        disabled={!canUndo}
        icon={<IconUndo />}
        description={labelUndo}
        onClick={undo}
        activeColor="primary"
      />
      <Button
        active
        disabled={!canRedo}
        icon={<IconRedo />}
        description={labelRedo}
        onClick={redo}
        activeColor="primary"
      />
    </Box>
  );
};

export default React.memo(UndoRedo);
