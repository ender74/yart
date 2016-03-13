import React, { Component } from 'react'
import Radium from 'radium'

const Label = ( { id, style, checked, text, children, onCheck, onClick } ) => {
    return <div style={ style } key={ id }> 
        <label style={ styles.lbl } onClick={ onClick }> 
            <input style={ onCheck ? styles.chk : styles.hidden } type='checkbox' 
                onClick={ onCheck } defaultChecked={ checked } /> 
            { text } </label> 
        { children } 
    </div>
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