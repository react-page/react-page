import type { Value } from './node';

export type Callbacks = {
  /**
   * is called when the value has changed.
   * Use this to save the new value
   */
  onChange?: null | ((v: Value) => void);

  /**
   * is called when the language has changed
   */
  onChangeLang?: null | ((l: string) => void);
};
