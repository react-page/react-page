import { Omit } from './omit';
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
