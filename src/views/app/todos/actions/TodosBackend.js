import Parse from 'parse'

import { Tag, convertTagToModel } from './TagsBackend'

export const Todo = Parse.Object.extend('Todo')

function convertToModel(todoFromParse) {
    const completeParse = todoFromParse.get('complete')
    let complete = false
    if (typeof completeParse === 'string')
        complete = 'true' === completeParse
    else
        complete = completeParse
    const ret = {
        id: todoFromParse.id,
        text: todoFromParse.get('text') || 'Todo',
        url: todoFromParse.get('url'),
        due: todoFromParse.get('due'),
        location: todoFromParse.get('location'),
        complete: complete || false,
        tags: []
    }
    const tagsBackend = todoFromParse.get('tags')
    if (tagsBackend) {
        for (var i = 0; i < tagsBackend.length; i++) {
            var object = tagsBackend[i]
            if (object)
                ret.tags.push(convertTagToModel(object))
            else
                alert('data integrity check failed - orphaned tag for todo: ' + todoFromParse.id)
        }
    }
    return ret
}

function mergeTodo(todo, newVal) {
    const fields = ['text', 'url', 'due', 'location', 'complete']
    for (var field of fields) {
        const src = newVal[field]
        if (typeof src != 'function') {
            if (src)
                todo.set(field, '' + src)
            else
                todo.unset(field)
        }
    }

    todo.unset('tags')
    if (newVal.tags) {
        for (var tag of newVal.tags) {
            const tagBackend = new Tag(JSON.parse(JSON.stringify(tag)))
            todo.add('tags', tagBackend)
        }
    }
}

function saveTodo(todo, onSuccess, onFailure) {
    todo.save().then((obj) => {
        onSuccess(convertToModel(obj))
    },
    (error) => {
        onFailure(error)
    })
}

export function loadTodosBackend(onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const username = currentUser.getUsername()
        const query = new Parse.Query(Todo)
        query.include('tags')
        query.equalTo('username', username)
        query.find().then(
            (results) => {
                const todos = []
                for (var i = 0; i < results.length; i++) {
                    var object = results[i]
                    todos.push(convertToModel(object))
                }
                onSuccess(todos)
            },
            (result, error) => {
                onFailure(result, error)
            }
        )
        
    }
}

export function createTodoBackend(newVal, onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const username = currentUser.getUsername()

        const todo = new Todo()
        mergeTodo(todo, newVal)
        todo.set('username', username)
        todo.save().then((obj) => {
            onSuccess(convertToModel(obj))
        },
        (error) => {
            onFailure(error)
        })
    }
}

export function destroyTodoBackend(oldTodo, onSuccess, onFailure) {
    var currentUser = Parse.User.current()

    if (currentUser) {
        const todo = new Todo()
        todo.id = oldTodo.id
        todo.destroy().then((obj) => {
            onSuccess(oldTodo)
        },
        (error) => {
            onFailure(JSON.stringify(error))
        })
    }
}

export function updateTodoBackend(newTodo, onSuccess, onFailure) {
    var currentUser = Parse.User.current()
    if (currentUser) {
        var query = new Parse.Query(Todo)
        query.get(newTodo.id).then(
            (todo) => {
                mergeTodo(todo, newTodo)
                const mergedTodo = JSON.stringify(todo)
                console.log('mergedTodo: ' + mergedTodo)
                saveTodo(todo, onSuccess, onFailure)
            },
            (error) => {
                onFailure(error)
            }
        )
    }
}