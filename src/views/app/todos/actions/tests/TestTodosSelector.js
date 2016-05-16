import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { TodoState, Todo, TodoList, Tag, TagList } from '../Types'
import { showAllSelector, activeTodoSelector, visibleTodosSelector } from '../TodosSelector'

chai.use(chaiImmutable)

describe('showAllSelector', () => {
    it('should return false when state is empty', () => {
        const state = {
            todos: TodoState()
        }
        const result = showAllSelector(state)
        expect(result).to.be.false
    }),
    it('should return showAll when false', () => {
       const state = {
            todos: TodoState({
                showAll: false
            })
        }
        const result = showAllSelector(state)
        expect(result).to.be.false
    }),
    it('should return showAll when true', () => {
        const state = {
            todos: TodoState({
                showAll: true
            })
        }
        const result = showAllSelector(state)
        expect(result).to.be.true
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
                ]),
                activeTodo: Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                })
            })
        }
        const result = activeTodoSelector(state)
        expect(result).to.equal(expected)
    }),
    it('should return undefined when activeTodo is not set', () => {
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
        expect(result).to.be.undefined
    })
})

describe('visibleTodosSelector', () => {
    it('should return only uncompleted todos when showAll is false', () => {
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
                ]),
                showAll: false
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    }),
    it('should return all todos when showAll is true', () => {
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
                ]),
                showAll: true
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
})