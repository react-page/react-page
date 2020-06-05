import createInitialChildren, {
  InitialChildrenDef,
} from '../createInitialChildren';

export default (childrenOrRowDef: InitialChildrenDef) => {
  if (Array.isArray(childrenOrRowDef)) {
    return createInitialChildren(childrenOrRowDef);
  }
  return childrenOrRowDef;
};
