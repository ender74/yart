import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import color from 'color'

const Button = ( { tooltip, style, hidden, image, text, onClick } ) => {
    return <button title={ tooltip } style={ hidden ? styles.hidden : [ styles.btn, style ] } onClick={ onClick }>
        { image ? <img style={ styles.img } align='middle' src={ image } /> : ''}
        { text ? text : ''}
    </button>
}

Button.propTypes={ 
    tooltip: PropTypes.string.isRequired,
    style: PropTypes.object,
    hidden: PropTypes.bool,
    image: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired 
}

const styles = {
  btn: {
    background: 'none',
    padding: '1px 6px 1px 6px',
    borderStyle: 'none',
 
    ':hover': {
      background: color('#CCCCCC').lighten(0.2).hexString()
    }
  },
  img: {
    width: '24px',
    height: '24px',
    verticalAlign: 'middle'  //Text zur Bildmitte ausrichten
  },
  hidden: {
      'display': 'none'
  }
}

export default Radium(Button)