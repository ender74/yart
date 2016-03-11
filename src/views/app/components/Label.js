import React, { Component } from 'react'
import Radium from 'radium'

class Label extends Component {
    render() {
        return <div 
            style={ this.props.style } 
            key={ this.props.id }
            className={ this.props.className }> 
            <label style={ styles.lbl } onClick={ this.props.onClick }> 
                <input style={ this.props.onCheck ? styles.chk : styles.hidden } type='checkbox' 
                    onClick={ this.props.onCheck } checked={ this.props.checked } /> 
                { this.props.text } </label> 
            { this.props.children } 
        </div>
    }
}

var styles = {
  lbl: {
    display: 'table-cell', 
    verticalAlign: 'middle'
  },
  chk: {
      
  },
  hidden: {
      display: 'none'
  }
}

export default Radium(Label)