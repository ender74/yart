import C from './TodosConstants'

const TodoActions = {
    toggleShowAll() {
        return {
            type: C.TODO_TOGGLE_SHOWALL  
        }    
    },
    
    toggleActive(todo) {
        return {
            type: C.TODO_TOGGLE_ACTIVE,
            todo: todo
        }
    },

    toggleComplete(todo) {
        return {
            type: C.TODO_TOGGLE_COMPLETE,
            todo: todo
        }
    },
    
    addNewTodo(text) {
        return {
            type: C.TODO_ADD_NEW,
            text: text
        }
    },
    
    destroyTodo(todo) {
        return {
            type: C.TODO_DESTROY,
            todo: todo
        }
    },
    
    updateTodoProp(todo, prop, text) {
        return {
            type: C.TODO_UPDATE_PROP,
            todo: todo,
            prop: prop,
            text: text
        }
    },
    
    updateActiveTodo(props) {
        return {
            type: C.TODO_UPDATE_ACTIVE,
            props: props
        }
    }
}

export default TodoActions
