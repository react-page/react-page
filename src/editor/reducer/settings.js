// @flow
import { UPDATE_SETTING } from 'src/editor/actions/setting'
import { dismissedMobilePreviewKey } from 'src/editor/components/Notifier/index'

export const settings = (state : Object = {
  [dismissedMobilePreviewKey]: false
}, action: {
  type: string,
  key: string,
  value: any
}) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}
