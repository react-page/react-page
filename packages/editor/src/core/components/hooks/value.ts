import { useSelector } from '../../reduxConnect';

import { currentValue } from '../../selector/editable';
import type { Value } from '../../types/node';
import deepEquals from '../../utils/deepEquals';

type ValueSelector<T> = (node: Value | null) => T;
/**
 *
 * @param selector receives the current value node object and returns T
 * @returns the selection T
 */
export const useValueNode = <T>(selector: ValueSelector<T>) => {
  return useSelector((state) => selector(currentValue(state)), deepEquals);
};
