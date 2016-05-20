import { createSelector } from 'reselect'
import { Filters } from './Types'

const todosSelector = state => state.todos.todos || []

const defaultFilter = Filters.DEFAULT
export const filterSelector = state => state.todosDisplay ? state.todosDisplay.activeFilter || defaultFilter : defaultFilter

const defaultTodoRef = undefined
const activeTodoRefSelector = state => state.todosDisplay ? state.todosDisplay.activeTodo || defaultTodoRef : defaultTodoRef

export const visibleTodosSelector = createSelector(
  todosSelector,
  filterSelector,
  (todos, filter) => {
        switch (filter) {
            case Filters.DEFAULT:
                return todos.filter(t => !t.complete)
            case Filters.ALL:
                return todos
        }
    }
)

export const activeTodoSelector = createSelector(
  todosSelector,
  activeTodoRefSelector,
  (todos, activeTodo) => activeTodo ? todos.find(t => t.id === activeTodo.id) : {}
)