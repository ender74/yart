import React, { Component } from 'react'
import Radium from 'radium'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import Modal from 'react-modal'

import Input from './Input'
import ButtonBar from './ButtonBar'
import Button from './Button'

class DateTimeInput extends Component {
    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this._onChangePick = this._onChangePick.bind(this)
    }
        
    render() {
        return <div style= {styles.base}> 
                <Input 
                    {...this.props} />
                <ButtonBar style= { styles.buttonBar }> 
                    <Button onClick={ this.openModal } tooltip='Datum auswählen' image="icons/calendar.svg" />
                </ButtonBar>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={styles.modal} >                
                    <DatePicker
                        date={ this.props.value }
                        onChange={ this._onChangePick }
                        hideFooter='true'
                    />
                </Modal>
        </div>
    }
    
    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    parse(text) {
       return moment(text, moment.localeData().longDateFormat('LL'))
    }
    
    formatUTCText(date) {
        return date ? this.format(moment(date)) : date
    }
    
    format(moment) {
        return moment.format('LL') 
    }
    
    _onChangePick(date, moment) {
        this.props.onSave( moment.toISOString() )
        this.closeModal()
    } 
}

const styles = {
    modal : {
        overlay : {
            position          : 'fixed',
            top               : 0,
            left              : 0,
            right             : 0,
            bottom            : 0,
            backgroundColor   : 'rgba(255, 255, 255, 0.3)'
        },
        content : {
            position                   : 'absolute',
            top                        : '20%',
            left                       : '20%',
            right                      : '20%',
            bottom                     : '20%',
            border                     : '1px solid #ccc',
            background                 : '#fff',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '4px',
            outline                    : 'none',
            padding                    : '20px'
        }
    },
    buttonBar: {
        display: 'table-cell', 
        verticalAlign: 'middle'
    },
    base: {
        display: 'table'
    }
}

export default Radium(DateTimeInput)