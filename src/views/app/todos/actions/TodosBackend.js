import Parse from 'parse'

const Todo = Parse.Object.extend("Todo")

function convertToModel(todoFromParse) {
    return {
        id: todoFromParse.id,
        text: todoFromParse.get("text"),
        url: todoFromParse.get("url"),
        due: todoFromParse.get("due"),
        location: todoFromParse.get("location"),
        complete: todoFromParse.get("complete") === "true"
    }
}

function convertFromModel(todo) {
    return new Todo({
        id: todo.id,
        text: todo.text,
        url: todo.url,
        due: todo.due,
        location: todo.location,
        complete: todo.complete ? "true" : "false"
    })
}

function mergeTodo(todo, newVal) {
    for (var prop in newVal) {
        todo.set(prop, "" + newVal[prop])
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
        query.equalTo("username", username)
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
        todo.set("username", username)
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
            onFailure(error)
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
                saveTodo(todo, onSuccess, onFailure)
            },
            (error) => {
                onFailure(error)
            }
        )
    }
}