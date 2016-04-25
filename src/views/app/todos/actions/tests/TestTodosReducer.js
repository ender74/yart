import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { TodoState, Todo, TodoList } from '../Types'
import C from '../TodosConstants'
import todosReducer from '../TodosReducer'

chai.use(chaiImmutable)

describe('todosReducer', () => {
    it('should return initialstate when given no state', () => {
        const stateExpected = TodoState()
        const state = {}
        expect(todosReducer(state.state, {type: 'INIT'})).to.equal(stateExpected)
    })
    it('should add todo', () => {
        const stateBefore = TodoState()
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_NEW,
            todo: {
                id: '0815',
                text: 'Hallo',
                complete: false
            }
        })).to.equal(stateExpected)
    })
    it('should remove todo', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_DESTROY,
            todo: {
                id: '0815'
            }
        })).to.equal(stateExpected)
    })
    it('should load todos', () => {
        const stateBefore = TodoState()
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_LOAD,
            todos: [
                {
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                },
                {
                    id: '0816',
                    text: 'Welt',
                    complete: false
                }
            ]
        })).to.equal(stateExpected)
    })
    it('should activate todo', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })            ]),
            activeTodo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: {
                id: '0815'
            }
        })).to.equal(stateExpected)
    })
    it('should deactivate todo', () => {
        const stateBefore = TodoState({
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
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: {
                id: '0815'
            }
        })).to.equal(stateExpected)
    })
    it('should toggle todo completion when false', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        const stateExpected = TodoState({
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
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_TOGGLE_COMPLETE,
            todo: {
                id: '0816'
            }
        })).to.equal(stateExpected)
    })
    it('should toggle todo completion when true', () => {
        const stateBefore = TodoState({
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
        })
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_TOGGLE_COMPLETE,
            todo: {
                id: '0816'
            }
        })).to.equal(stateExpected)
    })
})