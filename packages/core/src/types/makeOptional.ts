import { Omit } from './Omit';
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
