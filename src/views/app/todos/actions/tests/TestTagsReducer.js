import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'

import { TagState, Tag, TagList } from '../Types'
import C from '../TagsConstants'
import tagsReducer from '../TagsReducer'

chai.use(chaiImmutable)

describe('tagsReducer', () => {
    it('should return initialstate when given no state', () => {
        const stateExpected = TagState()
        let stateBefore
        expect(tagsReducer(stateBefore, {type: 'INIT'})).to.equal(stateExpected)
    })
    it('should add new Tag', () => {
        const stateBefore = TagState()
        const stateExpected = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                })
            ])
        })
        expect(tagsReducer(stateBefore, {
            type: C.TAG_ADD_NEW,
            tag: {
                id: '0815',
                text: 'Tag 1'
            }
        })).to.equal(stateExpected)
    })
    it('should load Tags', () => {
        const stateBefore = TagState()
        const stateExpected = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                }),
                Tag({
                    id: '0816',
                    text: 'Tag 2',
                    refCount: 4
                })
            ])
        })
        expect(tagsReducer(stateBefore, {
            type: C.TAG_LOAD,
            tags: [
                {
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                },
                {
                    id: '0816',
                    text: 'Tag 2',
                    refCount: 4
                }
            ]
        })).to.equal(stateExpected)
    })
    it('should increment usage for Tag', () => {
        const stateBefore = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                })
            ])
        })
        const stateExpected = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 2
                })
            ])
        })
        expect(tagsReducer(stateBefore, {
            type: C.TAG_ADD_NEW,
            tag: {
                id: '0815',
                text: 'Tag 1'
            }
        })).to.equal(stateExpected)
    })
    it('should destroy unused Tag', () => {
        const stateBefore = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                })
            ])
        })
        const stateExpected = TagState()
        expect(tagsReducer(stateBefore, {
            type: C.TAG_DESTROY,
            tag: {
                id: '0815',
                text: 'Tag 1',
            }
        })).to.equal(stateExpected)
    })
    it('should decrement usage for Tag', () => {
        const stateBefore = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 2
                })
            ])
        })
        const stateExpected = TagState({
            tags: TagList([
                Tag({
                    id: '0815',
                    text: 'Tag 1',
                    refCount: 1
                })
            ])
        })
        expect(tagsReducer(stateBefore, {
            type: C.TAG_DESTROY,
            tag: {
                id: '0815',
                text: 'Tag 1'
            }
        })).to.equal(stateExpected)
    })
})