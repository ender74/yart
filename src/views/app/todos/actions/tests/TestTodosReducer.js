import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { TodoState, Todo, TodoList, Tag, TagList } from '../Types'
import C from '../TodosConstants'
import todosReducer from '../TodosReducer'

chai.use(chaiImmutable)

describe('todosReducer', () => {
    it('should return initialstate when given no state', () => {
        const stateExpected = TodoState()
        let stateBefore
        expect(todosReducer(stateBefore, {type: 'INIT'})).to.equal(stateExpected)
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
    it('should add tag to active todo', () => {
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
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '0815',
                            text: 'Tag 1',
                            refCount: 5
                        })
                    ])
                })
            ]),
            activeTodo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                tags: TagList([
                    Tag({
                        id: '0815',
                        text: 'Tag 1',
                        refCount: 5
                    })
                ])
            })
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_TAG,
            tag: {
                id: '0815',
                text: 'Tag 1',
                refCount: 5
            }
        })).to.equal(stateExpected)
    })
    it('should remove tag from active todo', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1',
                            refCount: 5
                        }),
                        Tag({
                            id: '1235',
                            text: 'Tag 2',
                            refCount: 1
                        })
                    ])
                })
            ]),
            activeTodo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                tags: TagList([
                    Tag({
                        id: '1234',
                        text: 'Tag 1',
                        refCount: 5
                    }),
                    Tag({
                        id: '1235',
                        text: 'Tag 2',
                        refCount: 1
                    })
                ])
            })
        })
        const stateExpected = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1',
                            refCount: 5
                        })
                    ])
                })
            ]),
            activeTodo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                tags: TagList([
                    Tag({
                        id: '1234',
                        text: 'Tag 1',
                        refCount: 5
                    })
                ])
            })
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_REMOVE_TAG,
            tag: {
                text: 'Tag 2'
            }
        })).to.equal(stateExpected)
    })
})