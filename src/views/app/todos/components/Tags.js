import React, { PropTypes, Component } from 'react'
import { Label, FormControl, Row, Col } from 'react-bootstrap'

const ENTER_KEY_CODE = 13

const TagEntry = ( { text } ) => {
    return <Label>{ text }</Label>
}

const Tags = ( { tags, onAddTag } ) => {
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
        <div>
            <Row>
                <Col>
                    { entries }
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormControl
                        value={ undefined }
                        placeholder='add new tag here'
                        onKeyDown = { ( event ) => {
                                if (event.keyCode === ENTER_KEY_CODE) {
                                    onAddTag(event.target.value)
                                }
                            }
                        }
                    />
                </Col>
            </Row>
        </div>
    )
}

Tags.propTypes={
    tags: PropTypes.array.isRequired,
    onAddTag: PropTypes.func
}

export default Tags