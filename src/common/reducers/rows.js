import {INSERT_ROW, DELETE_ROW, POSITION_ROW} from 'common/actions/rows'

export default (state = {}, action) => {
    switch (action.type) {
        case DELETE_ROW:
            return [...state]
        case POSITION_ROW:
            return [...state]
        case INSERT_ROW:
            return [...state]
        default:
            return state
    }
}
 