import React, { Component } from 'react'
import Radium from 'radium'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import Modal from 'react-modal'

import Input from './Input'
import ButtonBar from './ButtonBar'
import Button from './Button'

const ENTER_KEY_CODE = 13

class DateTimeInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this._save=this._save.bind(this)
        this._onChange=this._onChange.bind(this)
        this._onChangePick=this._onChangePick.bind(this)
        this._onKeyDown=this._onKeyDown.bind(this)
        this._onBlur=this._onBlur.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
        
    componentDidMount() { 
    }
    
    componentWillUnmount() { 
    }

    render() {
        const value = this.state.valueSet ? this.state.value : this.formatUTCText(this.props.defaultValue)
        const valuePick = value ? this.parse(value).toDate() : value
        const placeholder = this.props.placeholder ? this.props.placeholder : this.format(moment())
        return <div style= {styles.base}> 
                <Input 
                    className={ this.props.className }
                    style={ this.props.style }
                    id = { this.props.id }
                    placeholder = { placeholder }
                    onBlur = { this._onBlur }
                    onChange = { this._onChange }
                    onKeyDown = { this._onKeyDown }
                    value = { value }
                    autoFocus = { true} />
                <ButtonBar style= { styles.buttonBar }> 
                    <Button onClick={ this.openModal } tooltip='Datum auswählen' image="icons/calendar.svg" />
                </ButtonBar>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={styles.modal} >                
                    <DatePicker
                        date={valuePick}
                        onChange={this._onChangePick}
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
    
    _save() {
        if (this.state.value)
            this.props.onSave( this.parse(this.state.value).toISOString() )
        this.setState({ valueSet: false })
    } 
   
    _onBlur() {
        this._save()
    } 

    _onChange(event) {
        const value = event.target.value
        this.setState({ value: value, valueSet: true })
    } 

    _onChangePick(date, moment) {
        this.props.onSave( moment.toISOString() )
        this.setState({ valueSet: false })
        this.closeModal()
    } 

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save()
        }
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