import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { TodoState, TodoDisplayState, Todo, TodoList, Tag, TagList } from '../Types'
import C from '../TodosConstants'
import { todosReducer, todosDisplayReducer } from '../TodosReducer'

chai.use(chaiImmutable)

describe('todosReducer', () => {
    it('should return initialstate when given no state', () => {
        const stateExpected = TodoState()
        let stateBefore
        expect(todosReducer(stateBefore, {type: 'INIT'})).to.deep.equal(stateExpected)
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
        })).to.deep.equal(stateExpected)
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
        })).to.deep.equal(stateExpected)
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
        })).to.deep.equal(stateExpected)
    })
    it('should load todos with tags', () => {
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
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: 'tag1',
                            text: 'Tag 1'
                        })
                    ])
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
                    complete: false,
                    tags: [
                        {
                            id: 'tag1',
                            text: 'Tag 1'
                        }
                    ]
                }
            ]
        })).to.deep.equal(stateExpected)
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
        })).to.deep.equal(stateExpected)
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
        })).to.deep.equal(stateExpected)
    })
    it('should add tag to todo', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                })
            ])
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
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_TAG,
            tag: {
                id: '0815',
                text: 'Tag 1'
            },
            todo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })).to.deep.equal(stateExpected)
    })
    it('should ignore extra attributes when adding tag', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false
                })
            ])
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
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_TAG,
            tag: {
                id: '0815',
                text: 'Tag 1',
                refCount: 1
            },
            todo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })).to.deep.equal(stateExpected)
    })
    it('should remove tag from todo', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1'
                        }),
                        Tag({
                            id: '1235',
                            text: 'Tag 2'
                        })
                    ])
                })
            ])
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
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_REMOVE_TAG,
            tag: {
                text: 'Tag 2'
            },
            todo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })).to.deep.equal(stateExpected)
    })
    it('should not add tag twice', () => {
        const stateBefore = TodoState({
            todos: TodoList([
                Todo({
                    id: '0815',
                    text: 'Hallo',
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
        })
        const stateExpected = stateBefore
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_TAG,
            tag: {
                id: '0815',
                text: 'Tag 1'
            },
            todo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })).to.deep.equal(stateExpected)
    })
    it('should add tag to todo when tag is already used', () => {
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
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
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
                            text: 'Tag 1'
                        })
                    ])
                }),
                Todo({
                    id: '0816',
                    text: 'Welt',
                    complete: false,
                    tags: TagList([
                        Tag({
                            id: '1234',
                            text: 'Tag 1'
                        })
                    ])
                })
            ])
        })
        expect(todosReducer(stateBefore, {
            type: C.TODO_ADD_TAG,
            tag: {
                id: '0815',
                text: 'Tag 1'
            },
            todo: Todo({
                id: '0815',
                text: 'Hallo',
                complete: false
            })
        })).to.deep.equal(stateExpected)
    })
})