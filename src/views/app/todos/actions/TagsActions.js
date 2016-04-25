import C from './TagsConstants'

import { loadTagsBackend, createTagBackend, destroyTagBackend, updateTagBackend } from './TagsBackend'

//TODO: implement refCounter in Backend
const TagsActions = {
    addTag(text) {
        return (dispatch, getState) => {
            const newTag = {
                text: text
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