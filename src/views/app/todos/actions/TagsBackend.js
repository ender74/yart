import Parse from 'parse'

export const Tag = Parse.Object.extend("Tag")

export function convertTagToModel(tagFromParse) {
    return {
        id: tagFromParse.id,
        text: tagFromParse.get("text"),
        refCount: tagFromParse.get("refCount")
    }
}

function convertFromModel(tag) {
    return new Tag({
        id: tag.id,
        text: tag.text,
        refCount: tag.refCount
    })
}

function mergeTag(tag, newVal) {
    for (var prop in newVal) {
        var v = newVal[prop]
        if (v)
            tag.set(prop, v)
        else
            tag.unset(prop)
    }
}

function saveTag(tag, onSuccess, onFailure) {
    tag.save().then((obj) => {
        onSuccess(convertTagToModel(obj))
    },
    (error) => {
        onFailure(error)
    })
}

export function loadTagsBackend(onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const username = currentUser.getUsername()
        const query = new Parse.Query(Tag)
        query.equalTo("username", username)
        query.find().then(
            (results) => {
                const tags = []
                for (var i = 0; i < results.length; i++) {
                    var object = results[i]
                    tags.push(convertTagToModel(object))
                }
                onSuccess(tags)
            },
            (result, error) => {
                onFailure(result, error)
            }
        )
        
    }
}

export function createTagBackend(newVal, onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const username = currentUser.getUsername()

        const tag = new Tag()
        mergeTag(tag, newVal)
        tag.set("username", username)
        tag.save().then((obj) => {
            onSuccess(convertTagToModel(obj))
        },
        (error) => {
            onFailure(error)
        })
    }
}

export function destroyTagBackend(oldTag, onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const tag = new Tag()
        tag.id = oldTag.id
        tag.destroy().then((obj) => {
            onSuccess(oldTag)
        },
        (error) => {
            onFailure(JSON.stringify(error))
        })
    }
}

export function updateTagBackend(newTag, onSuccess, onFailure) {
    var currentUser = Parse.User.current()
    if (currentUser) {
        var query = new Parse.Query(Tag)
        query.get(newTag.id).then(
            (tag) => {
                mergeTag(tag, newTag)
                saveTag(tag, onSuccess, onFailure)
            },
            (error) => {
                onFailure(error)
            }
        )
    }
}