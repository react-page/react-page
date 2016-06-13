export const REPLACE_EDITOR_STATE = 'REPLACE_EDITOR_STATE'

export const replaceEditorState = (editorState) => ({
    type: REPLACE_EDITOR_STATE,
    payload: editorState
})

export const BEGIN_EDITING_ENTITY = 'BEGIN_EDITING_ENTITY'
export const FINISH_EDITING_ENTITY = 'FINISH_EDITING_ENTITY'
export const MERGE_ENTITY_DATA = 'MERGE_ENTITY_DATA'

export const beginEditingEntity = (entityKey) => ({
    type: BEGIN_EDITING_ENTITY,
    payload: entityKey
})

export const finishEditingEntity = (entityKey) => ({
    type: FINISH_EDITING_ENTITY,
    payload: entityKey
})

export const mergeEntityData = (entityKey, data) => ({
    type: MERGE_ENTITY_DATA,
    payload: {
        entityKey,
        data
    }
})

export const INSERT_INLINE_ENTITY = 'INSERT_INLINE_ENTITY'

export const insertInlineEntity = (type, mutability, data) => ({
    type: INSERT_INLINE_ENTITY,
    payload: {
        type,
        mutability,
        data
    }
})

export const INSERT_BLOCK_ENTITY = 'INSERT_BLOCK_ENTITY'

export const insertBlockEntity = (type, mutability, data) => ({
    type: INSERT_BLOCK_ENTITY,
    payload: {
        type,
        mutability,
        data
    }
})
