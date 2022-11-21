import type { Action } from 'redux';
export declare const SET_LANG = "SET_LANG";
export interface SetLangAction extends Action {
    lang: string;
}
export declare const setLang: (lang: string) => SetLangAction;
//# sourceMappingURL=setting.d.ts.map