import { createSelector } from 'reselect'

const defaultUser = undefined
export const userSelector = state => state.auth ? state.auth.user || defaultUser : defaultUser
