// @flow
import type { Action } from '../types/redux'

export const UPDATE_SETTING = 'UPDATE_SETTING'

export const updateSetting = (key: string, value: any): Action => ({
  type: UPDATE_SETTING,
  key,
  value
})
