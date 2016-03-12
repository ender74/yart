import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

const ButtonBar = ( { style, children } ) => {
    return <div style= { style }> 
                { children }
            </div> 
}

ButtonBar.propTypes={ 
    style: PropTypes.object,
    children: PropTypes.node.isRequired
}

export default Radium(ButtonBar)