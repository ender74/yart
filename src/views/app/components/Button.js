import React, { Component } from 'react'
import Radium from 'radium'
import color from 'color'

class Button extends Component {
    render() {
        return <button title={ this.props.tooltip } style={ this.props.hidden ? styles.hidden : [ styles.btn, this.props.style ] } className={ this.props.className } onClick={ this.props.onClick }>
            {this.props.image ? <img style={ styles.img } align='middle' src={ this.props.image } /> : ''}
            {this.props.text ? this.props.text : ''}
        </button>
    }
}

var styles = {
  btn: {
    background: 'none',
    padding: '1px 6px 1px 6px',
    'border-style': 'none',
 
    ':hover': {
      background: color('#CCCCCC').lighten(0.2).hexString()
    }
  },
  img: {
    width: '24px',
    height: '24px',
    'vertical-align': 'middle'  //Text zur Bildmitte ausrichten
  },
  hidden: {
      'display': 'none'
  }
}

export default Radium(Button)