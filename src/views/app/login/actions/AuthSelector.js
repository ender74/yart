import { createSelector } from 'reselect'

export const userSelector = state => state.auth.user || {}
