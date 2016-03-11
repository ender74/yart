import React, { Component } from 'react'
import Radium from 'radium'

import Button from '../../components/Button'
import ButtonBar from '../../components/ButtonBar'
import Label from '../../components/Label'

import TodoActions from '../../../../todoActions'

class TodoEntry extends Component {
    constructor(props) {
        super(props)
        this._onDestroyClick = this._onDestroyClick.bind(this)
        this._onToggleActiveClick = this._onToggleActiveClick.bind(this)
        this._onToggleCompleteClick = this._onToggleCompleteClick.bind(this)
        this._onOpenURL = this._onOpenURL.bind(this)
    }
    render() {
        const todo = this.props.todo
        const styleName = this.props.active ? 'active' : 'default'
        return <Label style={ [styles.base, styles[styleName]] } onCheck={ this._onToggleCompleteClick } checked={ todo.complete } key={ todo.id } text={ todo.text }>
               <ButtonBar style= { styles.buttonBar }> 
                    <Button hidden = { !todo.url } onClick={ this._onOpenURL } tooltip='Link öffnen' image="icons/link-button.svg" />
                    <Button onClick={ this._onToggleActiveClick } tooltip='Eintrag bearbeiten' image="icons/black-wrench.svg" />
                    <Button onClick={ this._onDestroyClick } tooltip='Eintrag löschen' image="icons/delete-button.svg" />
               </ButtonBar>
        </Label>
    }

    _onToggleActiveClick() {
        if (this.props.active)
            TodoActions.deactivate()
        else
            TodoActions.activate(this.props.todo.id)
    }

    _onDestroyClick() {
        TodoActions.destroy(this.props.todo.id)
    }

    _onToggleCompleteClick() {
        TodoActions.toggleComplete(this.props.todo)
    }

    _onOpenURL() {
        window.open(this.props.todo.url)
    }
}

var styles = {
       base: {
            'display': 'table',
            'padding': '0.5em 0.5em 0.5em 0.5em',
            'margin': '0.5em 0em 0em 0em',
            'width': '100%',
            'borderRadius': '10px',
            'color': '#000000'
        },
        default: {
            'background': 'rgba(255, 255, 255, 0.7)',
            'fontWeight': 'normal'
        },
        active: {
            'background': 'rgba(255, 255, 255, 0.7)',
            'fontWeight': 'bold'
        },
        buttonBar: {
            'float': 'right'
        }
}

export default Radium(TodoEntry)
