import React, { Component } from 'react'
import Radium from 'radium'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import { Button, Glyphicon, Modal } from 'react-bootstrap'

import ValidatedInput from './ValidatedInput'

require('browsernizr/test/inputtypes')

var Modernizr = require('browsernizr')

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

const PickDateModal = ({ isOpen, onRequestClose, valueForPicker, onChange }) => {
    return (
        <Modal show={ isOpen } onHide={ onRequestClose } backdrop={ true } aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true }>
                Datum wählen
            </Modal.Header>
            <Modal.Body>
                <DatePicker
                    date={ valueForPicker }
                    onChange={ onChange }
                    hideFooter='true'
                />
            </Modal.Body>
        </Modal>
    )
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
/*
        TODO: this doesn't work yet. The problem is, that the value is not in the right locale,
            but rather standard JS format yyyy-mm-dd
        if (Modernizr.inputtypes.date)
            return (
                <div style= {styles.base}>
                    <ValidatedInput type='date' {...this.props} />
                </div>
            )
*/
        return this.renderWithDatePicker(date)
    }
    
    renderWithDatePicker(date) {
        const btnPickDate = (
            <Button onClick={ this.openModal } tooltip='Datum auswählen'>
                <Glyphicon glyph='calendar' />
            </Button>
        )
        const valueForPicker = date != null && date.isValid() ? date : moment()
        return (
            <div style= {styles.base}>
                <ValidatedInput {...this.props} buttonAfter = { btnPickDate } />
                <PickDateModal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={styles.modal}
                    valueForPicker={ valueForPicker }
                    onChange={ this._onChangePick }
                />
            </div>
        )
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
    buttonBar: {
        display: 'table-cell', 
        verticalAlign: 'middle'
    },
    base: {
        display: 'table'
    }
}

export default Radium(DateTimeInput)