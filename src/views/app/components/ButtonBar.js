import React, { Component } from 'react'
import Radium from 'radium'

class ButtonBar extends Component {
    render() {        
        return <div style= { this.props.style }> 
                    { this.props.children }
               </div> 
    }
}

export default Radium(ButtonBar)