import { Record, Maybe, List } from 'typed-immutable'

export const Todo = Record({
    id: String,
    text: String,
    url: Maybe(String),
    due: Maybe(String),
    location: Maybe(String),
    complete: Boolean
})
export const TodoList = List(Todo)

export const TodoState = Record({
    todos: TodoList([]),
    activeTodo: Maybe(Todo),
    showAll: Boolean(false)
})

export const Tag = Record({
    id: String,
    text: String
})
export const TagList = List(Tag)

export const TagState = Record({
    tags: TagList([])
})