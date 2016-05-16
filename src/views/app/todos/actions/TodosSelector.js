import { createSelector } from 'reselect'

const todosSelector = state => state.todos.todos || []

export const showAllSelector = state => state.todos.showAll || false
export const activeTodoSelector = state => state.todos.activeTodo || {}

export const visibleTodosSelector = createSelector(
  todosSelector,
  showAllSelector,
  (todos, showAll) => showAll ? todos : todos.filter(t => !t.complete)
)