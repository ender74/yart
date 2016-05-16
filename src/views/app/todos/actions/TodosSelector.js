import { createSelector } from 'reselect'

const todosSelector = state => state.todos.todos || []

const defaultShowAll = false
export const showAllSelector = state => state.todos ? state.todos.showAll || defaultShowAll : defaultShowAll

const defaultTodo = {}
export const activeTodoSelector = state => state.todos ? state.todos.activeTodo || defaultTodo : defaultTodo

export const visibleTodosSelector = createSelector(
  todosSelector,
  showAllSelector,
  (todos, showAll) => showAll ? todos : todos.filter(t => !t.complete)
)