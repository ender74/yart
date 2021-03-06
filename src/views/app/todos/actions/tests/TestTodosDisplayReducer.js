import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { Filters, FilterList, Filter, TodoState, TodoDisplayState, DefaultTodoDisplayState, Todo, TodoRef, TodoList, Tag, TagList } from '../Types'
import C from '../TodosConstants'
import todosReducer, { todosDisplayReducer } from '../TodosReducer'

chai.use(chaiImmutable)

describe('todosDisplayReducer', () => {
    it('should return initialstate when given no state', () => {
        const stateExpected = DefaultTodoDisplayState
        let stateBefore
        expect(todosDisplayReducer(stateBefore, {type: 'INIT'})).to.deep.equal(stateExpected)
    })
    it('should deactive removed todo', () => {
        const stateBefore = TodoDisplayState({
            activeTodo: TodoRef({
                id: '0815'
            })
        })
        const stateExpected = TodoDisplayState({
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_DESTROY,
            todo: {
                id: '0815'
            }
        })).to.deep.equal(stateExpected)
    })
    it('should activate todo', () => {
        const stateBefore = TodoDisplayState({
        })
        const stateExpected = TodoDisplayState({
            activeTodo: TodoRef({
                id: '0815'
            })
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: {
                id: '0815'
            }
        })).to.deep.equal(stateExpected)
    })
    it('should deactivate todo', () => {
        const stateBefore = TodoDisplayState({
            activeTodo: TodoRef({
                id: '0815'
            })
        })
        const stateExpected = TodoDisplayState({
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: {
                id: '0815'
            }
        })).to.deep.equal(stateExpected)
    })
    it('should add filter', () => {
        const stateBefore = TodoDisplayState({
        })
        const stateExpected = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.OVERDUE
                })
            ])
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_ADD_FILTER,
            filter: Filters.OVERDUE
        })).to.deep.equal(stateExpected)
    })
    it('should remove filter', () => {
        const stateBefore = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                }),
                Filter({
                    name: Filters.OVERDUE
                })
            ])
        })
        const stateExpected = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                })
            ])
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_REMOVE_FILTER,
            filter: Filters.OVERDUE
        })).to.deep.equal(stateExpected)
    })
    it('should add multiple filters', () => {
        const stateBefore = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                })
            ])
        })
        const stateExpected = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                }),
                Filter({
                    name: Filters.DUE_TODAY
                })
            ])
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_ADD_FILTER,
            filter: Filters.DUE_TODAY
        })).to.deep.equal(stateExpected)
    })
    it('should not add 2 time filters', () => {
        const stateBefore = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                }),
                Filter({
                    name: Filters.OVERDUE
                })
            ])
        })
        const stateExpected = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                }),
                Filter({
                    name: Filters.DUE_TODAY
                })
            ])
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_ADD_FILTER,
            filter: Filters.DUE_TODAY
        })).to.deep.equal(stateExpected)
    })
    it('should remove all other filters when adding NONE', () => {
        const stateBefore = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.DEFAULT
                }),
                Filter({
                    name: Filters.OVERDUE
                })
            ])
        })
        const stateExpected = TodoDisplayState({
            activeFilters: FilterList([
                Filter({
                    name: Filters.NONE
                })
            ])
        })
        expect(todosDisplayReducer(stateBefore, {
            type: C.TODO_ADD_FILTER,
            filter: Filters.NONE
        })).to.deep.equal(stateExpected)
    })
})