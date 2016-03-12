import React, { Component } from 'react'
import Radium from 'radium'

import Todos from './components/Todos'
import TodoDetails from './components/TodoDetails'
import TodoConstants from '../../../todoConstants'
import TodoStore from '../../../todoStore'
import AppDispatcher from '../../../appDispatcher'

function getTodoState() {
    return {
        allTodos: TodoStore.getAll(),
        activeTodo: TodoStore.getActive()
    }
}

class TodosView extends Component {
    constructor() {
        super()
        this.state = getTodoState()
        this._onChange = this._onChange.bind(this)
    }
    
    render() {
        const styleName = this.state.activeTodo ? 'active' : 'default'
        
        return <div> 
                <Todos style={ styles.list[styleName] } activeTodo={ this.state.activeTodo } allTodos={ this.state.allTodos } />
                <TodoDetails style={ styles.details[styleName] } {...this.state.activeTodo} />
            </div>
    }

    componentDidMount() { 
        TodoStore.addChangeListener(this._onChange) 
    }
    
    componentWillUnmount() { 
        TodoStore.removeChangeListener(this._onChange) 
    }

    _onChange() { 
        this.setState(getTodoState()) 
    }    
}

const styles = {
    list: {
        default: {
            width: '100%'
        },
        
        active: {
            width: '60%'
        }
    },
    
    details: {
        default: {
            display: 'none'            
        },
        
        active: {
            position: 'fixed',
            width: '38%',
            top: '60px',
            right: '10px'
        }
    }
}

export default Radium(TodosView)