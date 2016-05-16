import { createSelector } from 'reselect'

const defaultUser = {}
export const userSelector = state => state.auth ? state.auth.user || defaultUser : defaultUser
