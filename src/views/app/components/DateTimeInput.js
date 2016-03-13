import React, { Component } from 'react'
import Radium from 'radium'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import Modal from 'react-modal'

import Input from './Input'
import ButtonBar from './ButtonBar'
import Button from './Button'

export function isValidDate(date) {
    return date && moment(date).isValid()
}

export function parseDate(text) {
    return moment(text, moment.localeData().longDateFormat('LL'))
}
    
export function formatDate(moment) {
    return moment.format('LL') 
}

export function parseISODate(date) {
    return isValidDate(date) ? moment(date) : moment()
}

export function formatISODate(moment) {
    return moment.toISOString()
}

export function formatUTCText(date) {
    return isValidDate(date) ? formatDate(moment(date)) : date
}
        
class DateTimeInput extends Component {
    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this._onChangePick = this._onChangePick.bind(this)
    }
        
    render() {
        const date = parseDate(this.props.value)
        const valueForPicker = date != null && date.isValid() ? date : moment()
        return <div style= {styles.base}> 
                <Input {...this.props} />
                <ButtonBar style= { styles.buttonBar }> 
                    <Button onClick={ this.openModal } tooltip='Datum auswählen' image="icons/calendar.svg" />
                </ButtonBar>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={styles.modal} >                
                    <DatePicker
                        date={ valueForPicker }
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
    
    _onChangePick(date, moment) {
        this.props.onChange( formatDate(moment) )
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