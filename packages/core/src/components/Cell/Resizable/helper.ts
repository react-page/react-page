export const computeStepWidth = ({
  rowWidth,
  steps,
}: {
  rowWidth: number;
  steps: number;
}): number => Math.round(rowWidth / (steps || 12));

export const widthToSize = (
  {
    stepWidth,
    steps,
    inline,
  }: { stepWidth: number; steps: number; inline: string },
  result: { width: number }
): number => {
  let size = Math.round(result.width / stepWidth);
  if (inline === 'right') {
    size = steps - size;
  }

  if (size > steps) {
    size = steps;
  } else if (size < 1) {
    size = 1;
  }

  return size;
};
