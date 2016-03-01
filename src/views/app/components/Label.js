import React, { Component } from 'react'
import Radium from 'radium'

class Label extends Component {
    render() {
        return <div 
            style={ this.props.style } 
            key={ this.props.id }
            className={ this.props.className }> 
            <label style={ styles.lbl } onClick={ this.props.onClick }> { this.props.text } </label> 
            { this.props.children } 
        </div>
    }
}

var styles = {
  lbl: {
    'display': 'table-cell', 
    'vertical-align': 'middle'
  }
}

export default Radium(Label)