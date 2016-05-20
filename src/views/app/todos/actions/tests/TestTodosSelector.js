import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { Filters, TodoState, TodoDisplayState, Todo, TodoRef, TodoList, Tag, TagList } from '../Types'
import { filterSelector, activeTodoSelector, visibleTodosSelector } from '../TodosSelector'

chai.use(chaiImmutable)

describe('filterSelector', () => {
    it('should return DEFAULT when state is empty', () => {
        const state = {
            todosDisplay: TodoDisplayState(),
        }
        const result = filterSelector(state)
        expect(result).to.equals(Filters.DEFAULT)
    }),
    it('should return DEFAULT', () => {
       const state = {
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.DEFAULT
            })
        }
        const result = filterSelector(state)
        expect(result).to.equal(Filters.DEFAULT)
    }),
    it('should return ALL', () => {
        const state = {
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.ALL
            })
        }
        const result = filterSelector(state)
        expect(result).to.equal(Filters.ALL)
    })
})

describe('activeTodoSelector', () => {
    it('should return activeTodo when set', () => {
        const expected = Todo({
            id: '0815',
            text: 'Hallo',
            complete: false
        })
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeTodo: TodoRef({
                    id: '0815'
                })
            })
        }
        const result = activeTodoSelector(state)
        expect(result).to.equal(expected)
    }),
    it('should return empty object when activeTodo is not set', () => {
        const expected = {}
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false
                    })
                ])
            })
        }
        const result = activeTodoSelector(state)
        expect(result).to.deep.equal(expected)
    })
})

describe('visibleTodosSelector', () => {
    it('should return only uncompleted todos when activeFilter is DEFAULT', () => {
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: true
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.DEFAULT
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    }),
    it('should return all todos when activeFilter is ALL', () => {
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            }),
            Todo({
                id: '0816',
                text: 'Welt',
                complete: true
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: true
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.ALL
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
})