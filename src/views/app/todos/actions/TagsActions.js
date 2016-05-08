import C from './TagsConstants'

import { loadTagsBackend, createTagBackend, destroyTagBackend, updateTagBackend } from './TagsBackend'

//TODO: implement refCounter in Backend
const TagsActions = {
    addTag(text, onSuccess) {
        return (dispatch, getState) => {
            const { tags } = getState()
            const tagIndex = tags.tags.findIndex(t => { return t.text == text } )
            if (tagIndex >= 0) {
                const tag = tags.tags.get(tagIndex)
                dispatch({
                    type: C.TAG_ADD_NEW,
                    tag
                })
                updateTagBackend(
                    tags.tags.get(tagIndex),
                    (tag) => { onSuccess(tag) },
                    (error) => {}
                )
            } else {
                const newTag = {
                    text: text,
                    refCounter: 1
                }

                createTagBackend(newTag,
                    (tag) => {
                        dispatch({
                            type: C.TAG_ADD_NEW,
                            tag
                        })
                        onSuccess(tag)
                    },
                    (error) => alert(error)
                )
            }
        }
    },

    load() {
        return (dispatch) => {
            loadTagsBackend(
                (tags) => dispatch({
                    type: C.TAG_LOAD,
                    tags: tags
                }),
                (tags, error) => alert(error)
            )
        }
    },

    destroyTag(oldTag, onSuccess) {
        return (dispatch, getState) => {
            dispatch({
                type: C.TAG_DESTROY,
                tag: oldTag
            })
            const { tags } = getState()
            const tagIndex = tags.tags.findIndex(t => { return t.text == text } )
            if (tagIndex < 0) {
                destroyTagBackend(oldTag,
                    (tag) => {
                        onSuccess(tag)
                    },
                    (error) => alert(error)
                )
            } else {
                updateTagBackend(tags.tags.get(tagIndex),
                    (tag) => {
                        onSuccess(tag)
                    },
                    (error) => alert(error)
                )
            }
        }
    }
}

export default TagsActions