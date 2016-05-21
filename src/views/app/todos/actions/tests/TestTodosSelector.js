import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import moment from 'moment'

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
    it('should return overdue todos', () => {
        const dayBefore = moment().subtract(1, 'days').toISOString()
        const dayAfter = moment().add(1, 'days').toISOString()
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                due: dayBefore
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false,
                        due: dayBefore
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: false,
                        due: dayAfter
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.OVERDUE
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
    it('should return todos which are due today', () => {
        const before = moment().subtract(1, 'days').toISOString()
        const in1 = moment().startOf('days').toISOString()
        const in2 = moment().endOf('days').toISOString()
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                due: in1
            }),
            Todo({
                id: '0817',
                text: 'Hello World',
                complete: false,
                due: in2
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false,
                        due: in1
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: false,
                        due: before
                    }),
                    Todo({
                      id: '0817',
                      text: 'Hello World',
                      complete: false,
                      due: in2
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.DUE_TODAY
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
    it('should return todos which are due this week', () => {
        const before = moment().subtract(1, 'week').toISOString()
        const in1 = moment().startOf('week').toISOString()
        const in2 = moment().endOf('week').toISOString()
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                due: in1
            }),
            Todo({
                id: '0817',
                text: 'Hello World',
                complete: false,
                due: in2
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false,
                        due: in1
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: false,
                        due: before
                    }),
                    Todo({
                      id: '0817',
                      text: 'Hello World',
                      complete: false,
                      due: in2
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.DUE_THISWEEK
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
    it('should return todos which are due next week', () => {
        const before = moment().subtract(1, 'week').toISOString()
        const in1 = moment().add(1, 'week').startOf('week').toISOString()
        const in2 = moment().add(1, 'week').endOf('week').toISOString()
        const expected = TodoList([
            Todo({
                id: '0815',
                text: 'Hallo',
                complete: false,
                due: in1
            }),
            Todo({
                id: '0817',
                text: 'Hello World',
                complete: false,
                due: in2
            })
        ])
        const state = {
            todos: TodoState({
                todos: TodoList([
                    Todo({
                        id: '0815',
                        text: 'Hallo',
                        complete: false,
                        due: in1
                    }),
                    Todo({
                        id: '0816',
                        text: 'Welt',
                        complete: false,
                        due: before
                    }),
                    Todo({
                      id: '0817',
                      text: 'Hello World',
                      complete: false,
                      due: in2
                    })
                ])
            }),
            todosDisplay: TodoDisplayState({
                activeFilter: Filters.DUE_NEXTWEEK
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
})