import { createSelector } from 'reselect'
import { Filters } from './Types'
import moment from 'moment'

const todosSelector = state => state.todos.todos || []

const todosDisplay = state => state.todosDisplay || {}

export const filtersSelector = state => (todosDisplay(state).activeFilters.toArray()).map(f => f.name)

const defaultTodoRef = undefined
const activeTodoRefSelector = state => todosDisplay(state).activeTodo || defaultTodoRef

const filterTodos = (todos, f) => todos.filter(f)

const filter = (todos, filter) => {
    switch (filter) {
        case Filters.DEFAULT:
            return filterTodos(todos, t => !t.complete)
        case Filters.OVERDUE:
            return filterTodos(todos, t => moment(t.due).isBefore(moment().startOf('day')))
        case Filters.DUE_TODAY:
            return filterTodos(todos, t => moment(t.due).isSame(moment(), 'day'))
        case Filters.DUE_THISWEEK:
            return filterTodos(todos, t => moment(t.due).isSame(moment(), 'week'))
        case Filters.DUE_NEXTWEEK:
            return filterTodos(todos, t => moment(t.due).isSame(moment().add(1, 'week'), 'week'))
        default:
            return todos
    }
}

export const visibleTodosSelector = createSelector(
    todosSelector,
    filtersSelector,
    (todos, filters) => {
        let ret = todos
        filters.forEach(f => {
            ret = filter(ret, f)
        })
        return ret
    }
)

export const activeTodoSelector = createSelector(
  todosSelector,
  activeTodoRefSelector,
  (todos, activeTodo) => activeTodo ? todos.find(t => t.id === activeTodo.id) : {}
)