import { TagState, Tag, TagList } from './Types'

import C from './TagsConstants'

const findTag = (state, text) => {
    return state.tags.findIndex(t => t.text === text)
}

const tagLoad = (state, tags) => {
    const tagList = TagList(tags)
    return state.set("tags", tagList)
}

const tagAddNew = (state, newTag) => {
    const indexFromState = findTag(state, newTag.text)
    if (indexFromState < 0)
        return state.set("tags", state.tags.push(newTag))
    else {
        const tag = state.tags.get(indexFromState)
        return state.set("tags", state.tags.set(indexFromState, tag.set("refCount", tag.refCount + 1)))
    }
}

const tagDestroy = (state, newTag) => {
    const indexFromState = findTag(state, newTag.text)
    if (indexFromState >= 0) {
        const tag = state.tags.get(indexFromState)
        if (tag.refCount <= 1)
            return state.set("tags", state.tags.delete(indexFromState))
        else {
            const tag = state.tags.get(indexFromState)
            return state.set("tags", state.tags.set(indexFromState, tag.set("refCount", tag.refCount - 1)))
        }
    }
    return state
}

function tagsReducer(state = TagState(), action){
    switch (action.type) {
        case C.TAG_ADD_NEW:
            return tagAddNew(state, action.tag)
        case C.TAG_DESTROY:
            return tagDestroy(state, action.tag)
        case C.TAG_LOAD:
            return tagLoad(state, action.tags)
        default:
            return state
    }
}

export default tagsReducer