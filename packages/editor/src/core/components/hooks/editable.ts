import { createContext, useContext } from 'react';
import { useSelector } from '../../reduxConnect';
import { RootState } from '../../selector';
import { editable } from '../../selector/editable';
import { Value } from '../../types/editable';
import deepEquals from '../../utils/deepEquals';

export const EditableContext = createContext<string>(null);

/**
 * @returns the current editable id
 */
export const useEditableId = () => useContext(EditableContext);

type EditableSelector<T> = (node: Value) => T;
/**
 *
 * @param selector receives the current editable object and returns T
 * @returns the selection T
 */
export const useEditableNode = <T>(selector: EditableSelector<T>) => {
  const editableId = useEditableId();
  return useSelector(
    (state: RootState) =>
      selector(
        editable(state, {
          id: editableId,
        })
      ),
    deepEquals
  );
};
