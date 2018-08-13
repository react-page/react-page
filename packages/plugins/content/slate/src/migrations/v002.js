import { Migration } from 'ory-editor-core/lib/service/plugin/classes';
import rename from 'deep-rename-keys';
const migration = new Migration({
    version: '0.0.2',
    migrateFromPrevious: state => {
        // wrap with document
        state = {
            ...state,
            ...(
                state.serialized ?
                    { serialized: { document: state.serialized } }
                    :
                    {}
            )
        }
        // rename keys
        var state = rename(state, (key) => {
            switch (key) {
                case 'kind':
                    return 'object'
                case 'ranges':
                    return 'leaves'
                default:
                    return key
            }
        });
        return state
    }
})

export default migration