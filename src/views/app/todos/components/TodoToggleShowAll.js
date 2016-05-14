import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Checkbox } from 'react-bootstrap'

const TodoToggleShowAll = ( { defaultChecked, toggleShowAll } ) => {
    return (
        <div style={ styles.chk }>
            <Checkbox onClick={ toggleShowAll } defaultChecked={ defaultChecked }>
                <FormattedMessage
                    id='todo.toggle_show_all'
                    defaultMessage='show all'
                />
            </Checkbox>
        </div>
    )
}

const styles = {
    chk: {
        'marginTop': '10px'
    }
}

export default TodoToggleShowAll