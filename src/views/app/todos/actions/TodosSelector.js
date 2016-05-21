import { createSelector } from 'reselect'
import { Filters } from './Types'
import moment from 'moment'

const todosSelector = state => state.todos.todos || []

const defaultFilter = Filters.DEFAULT
export const filterSelector = state => state.todosDisplay ? state.todosDisplay.activeFilter || defaultFilter : defaultFilter

const defaultTodoRef = undefined
const activeTodoRefSelector = state => state.todosDisplay ? state.todosDisplay.activeTodo || defaultTodoRef : defaultTodoRef

const filterTodos = (todos, f) => todos.filter(f)

export const visibleTodosSelector = createSelector(
  todosSelector,
  filterSelector,
  (todos, filter) => {
        switch (filter) {
            case Filters.DEFAULT:
                return filterTodos(todos, t => !t.complete)
            case Filters.ALL:
                return todos
            case Filters.OVERDUE:
                return filterTodos(todos, t => moment(t.due).isBefore(moment().startOf('day')))
            case Filters.DUE_TODAY:
                return filterTodos(todos, t => moment(t.due).isSame(moment(), 'day'))
            case Filters.DUE_THISWEEK:
                return filterTodos(todos, t => moment(t.due).isSame(moment(), 'week'))
            case Filters.DUE_NEXTWEEK:
                return filterTodos(todos, t => moment(t.due).isSame(moment().add(1, 'week'), 'week'))
        }
    }
)

export const activeTodoSelector = createSelector(
  todosSelector,
  activeTodoRefSelector,
  (todos, activeTodo) => activeTodo ? todos.find(t => t.id === activeTodo.id) : {}
)