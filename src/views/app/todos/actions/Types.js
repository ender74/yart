import defineEnum from './Enum'

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
    NONE: "NONE",
    ALL: "ALL",
    DEFAULT: "DEFAULT",
    OVERDUE: "OVERDUE",
    DUE_TODAY: "DUE_TODAY",
    DUE_THISWEEK: "DUE_THISWEEK",
    DUE_NEXTWEEK: "DUE_NEXTWEEK"
}

export const FilterProps = defineEnum({
    NONE: {
        groupMask: 0xffff
    },
    ALL: {
        groupMask: 0x0001
    },
    DEFAULT: {
        groupMask: 0x0001
    },
    OVERDUE: {
        groupMask: 0x0002
    },
    DUE_TODAY: {
        groupMask: 0x0002
    },
    DUE_THISWEEK: {
        groupMask: 0x0002
    },
    DUE_NEXTWEEK: {
        groupMask: 0x0002
    }
})

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