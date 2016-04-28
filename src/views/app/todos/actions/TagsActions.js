import C from './TagsConstants'

import { loadTagsBackend, createTagBackend, destroyTagBackend, updateTagBackend } from './TagsBackend'

//TODO: implement refCounter in Backend
const TagsActions = {
    addTag(text) {
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
                    (tag) => {},
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

    destroyTag(oldTag) {
        return (dispatch) => {
            destroyTagBackend(oldTag,
                (tag) => dispatch({
                    type: C.TAG_DESTROY,
                    tag: oldTag
                }),
                (error) => alert(error)
            )
        }
    }
}

export default TagsActions