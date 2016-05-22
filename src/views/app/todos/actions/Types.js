import { Record, Maybe, List } from 'typed-immutable'

export const Tag = Record({
    id: String,
    text: String,
    refCount: Number(1)
})
export const TagList = List(Tag)

export const TagRef = Record({
    id: String,
    text: String
})
export const TagRefList = List(TagRef)

export const TagState = Record({
    tags: TagList([])
})

export const Todo = Record({
    id: String,
    text: String,
    url: Maybe(String),
    due: Maybe(String),
    location: Maybe(String),
    complete: Boolean,
    tags: TagRefList([])
})
export const TodoList = List(Todo)

export const TodoState = Record({
    todos: TodoList([])
})

export const Filters = {
    ALL: "ALL",
    DEFAULT: "DEFAULT",
    OVERDUE: "OVERDUE",
    DUE_TODAY: "DUE_TODAY",
    DUE_THISWEEK: "DUE_THISWEEK",
    DUE_NEXTWEEK: "DUE_NEXTWEEK"
}

export const Filter = Record({
    name: String(Filters.DEFAULT)
})
export const FilterList = List(Filter)

export const TodoRef = Record({
    id: String
})
export const TodoDisplayState = Record({
    activeTodo: Maybe(TodoRef),
    activeFilters: FilterList
})

export const DefaultTodoDisplayState = TodoDisplayState({
    activeFilters: FilterList([
        Filter({name: Filters.DEFAULT})
    ])
})