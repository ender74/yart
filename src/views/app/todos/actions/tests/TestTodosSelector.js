import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import moment from 'moment'

import { Filters, Filter, FilterList, TodoState, TodoDisplayState, DefaultTodoDisplayState, Todo, TodoRef, TodoList, Tag, TagList } from '../Types'
import { filtersSelector, activeTodoSelector, visibleTodosSelector } from '../TodosSelector'

chai.use(chaiImmutable)

describe('filtersSelector', () => {
    it('should return DEFAULT when state is empty', () => {
        const state = {
            todosDisplay: DefaultTodoDisplayState,
        }
        const expected = [Filters.DEFAULT]
        const result = filtersSelector(state)
        expect(result).to.deep.equals(expected)
    }),
    it('should return all filters', () => {
       const state = {
            todosDisplay: TodoDisplayState({
                activeFilters: [
                    Filter({name: Filters.DEFAULT}),
                    Filter({name: Filters.OVERDUE})
                ]
            })
        }
        const expected = [Filters.DEFAULT, Filters.OVERDUE]
        const result = filtersSelector(state)
        expect(result).to.deep.equal(expected)
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
                activeFilters: FilterList([
                    Filter({name: Filters.DEFAULT})
                ])
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
                activeFilters: FilterList([
                    Filter({name: Filters.ALL})
                ])
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
                activeFilters: FilterList([
                    Filter({name: Filters.OVERDUE})
                ])
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
                activeFilters: FilterList([
                    Filter({name: Filters.DUE_TODAY})
                ])
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
                activeFilters: FilterList([
                    Filter({name: Filters.DUE_THISWEEK})
                ])
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
                activeFilters: FilterList([
                    Filter({name: Filters.DUE_NEXTWEEK})
                ])
            })
        }
        const result = visibleTodosSelector(state)
        expect(result).to.deep.equal(expected)
    })
})