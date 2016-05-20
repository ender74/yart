import { describe, it } from 'mocha'
import chai, { expect } from 'chai'

import { userSelector } from '../AuthSelector'

describe('userSelector', () => {
    it('should return user when logged in', () => {
        const expected = {
            id: '1',
            name: 'joe'
        }
        const state = {
            auth: {
                user: {
                    id: '1',
                    name: 'joe'
                }
            }
        }
        const result = userSelector(state)
        expect(result).to.deep.equal(expected)
    }),
    it('should return no user when not logged in', () => {
        const state = {}
        const result = userSelector(state)
        expect(result).to.be.undefined
    })
})