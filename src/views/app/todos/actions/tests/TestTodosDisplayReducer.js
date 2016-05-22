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
})