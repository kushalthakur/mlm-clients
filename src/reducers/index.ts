import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { authenticate } from './authenticate'

export * from './authenticate'

export const rootReducer = (history: History) => combineReducers({
   router: connectRouter(history),
   authenticate: authenticate
})