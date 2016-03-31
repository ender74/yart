import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid } from 'react-bootstrap'
import Radium, {StyleRoot} from 'radium'

import BoundTodos from '../BoundTodos'
import BoundToggleShowAll from '../BoundToggleShowAll'
import BoundTodoDetails from '../BoundTodoDetails'

const TodosView = ( { styleName, activeTodo, toggleActive, saveChanges, update } ) => {
    const detailsVisible = typeof activeTodo.id != 'undefined'
    const style = detailsVisible ? 'active' : 'default'
    return (
        <StyleRoot>
            <Grid>
                <div style = { styles[style].main }>
                    <BoundTodos style={ styles[style].list }>
                        <BoundToggleShowAll />
                    </BoundTodos>
                    <BoundTodoDetails style={ styles[style].details } todo = { activeTodo } />
                </div>
            </Grid>
        </StyleRoot>
    )
}

const styles = {
    'default': {
        main: {
            width: '100%'
        },

        list: {
        },

        details: {
            display: 'none'
        },
    },

    'active': {
        main: {
            display: 'flex',
            width: '100%'
        },

        list: {
            '@media (max-width: 768px)': {
                display: 'none'
            },
            '@media (min-width: 768px)': {
                flexBasis: '60%',
                width: '60%'
            }
        },

        details: {
            '@media (max-width: 768px)': {
                width: '100%'
            },
            '@media (min-width: 768px)': {
                flexBasis: '40%',
                width: '40%'
            }
        },
    }
}

export default Radium(TodosView)