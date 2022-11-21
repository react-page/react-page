import type { Value } from '../../types/node';
type ValueSelector<T> = (node: Value | null) => T;
/**
 *
 * @param selector receives the current value node object and returns T
 * @returns the selection T
 */
export declare const useValueNode: <T>(selector: ValueSelector<T>) => T;
export {};
//# sourceMappingURL=value.d.ts.map