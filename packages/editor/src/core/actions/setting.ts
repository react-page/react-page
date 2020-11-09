import { Action } from 'redux';

export const SET_LANG = 'SET_LANG';

export interface SetLangAction extends Action {
  lang: string;
}

export const setLang = (lang: string): SetLangAction => ({
  type: SET_LANG,
  lang,
});
