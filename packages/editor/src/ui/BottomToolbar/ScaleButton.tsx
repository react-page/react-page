import { IconButton, Tooltip } from '@material-ui/core';
import FormatSize from '@material-ui/icons/FormatSize';
import React from 'react';
const SCALING_FACTORS = [1, 0.8, 0.6, 1.2];
let lastScale = SCALING_FACTORS[0]; // poor mans redux

export const ScaleButton: React.FC<{
  scale: number;
  setScale: (s: number) => void;
}> = ({ scale, setScale }) => {
  const toggleScale = React.useCallback(() => {
    const newScalingFactor =
      SCALING_FACTORS[
        (SCALING_FACTORS.indexOf(lastScale ?? scale) + 1) %
          SCALING_FACTORS.length
      ];
    setScale(newScalingFactor);
    // poor man's redux
    lastScale = newScalingFactor;
  }, [scale, lastScale, setScale]);
  return (
    <Tooltip title="Toggle Scale">
      <IconButton
        onClick={toggleScale}
        aria-label="toggle scale"
        color="primary"
      >
        <FormatSize />
      </IconButton>
    </Tooltip>
  );
};
