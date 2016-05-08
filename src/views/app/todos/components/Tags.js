import React, { PropTypes, Component } from 'react'
import { Button, Label, Row, Col } from 'react-bootstrap'
import { FormField } from 'redux-form-fields'

const TagEntry = ( { text } ) => {
    return <h4 style={{ display: 'inline'}}><Label style={ styles.tag }>{ text }</Label></h4>
}

const styles = {
    tag: {
        marginLeft: '5px'
    },
    main: {
        marginLeft: '10px'
    },
    tags: {
        marginBottom: '10px'
    }
}

const Tags = ( { tags } ) => {
    if (tags === undefined || Object.keys(tags).length < 1) {
        return <div/>
    }
    var entries = []

    tags.forEach(
        tag => {
            entries.push(
                <TagEntry text={ tag.text } />
            )
        }
    )
    return (
        <div style={ styles.main }>
            <Row style={ styles.tags }>
                <Col>
                    { entries }
                </Col>
            </Row>
        </div>
    )
}

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    onAddTag: PropTypes.func
}

export default Tags