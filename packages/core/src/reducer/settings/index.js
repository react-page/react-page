// @flow
import { UPDATE_SETTING } from '../../actions/setting'

export const settings = (
  state: Object = {},
  action: {
    type: string,
    key: string,
    value: any
  }
) => {
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
