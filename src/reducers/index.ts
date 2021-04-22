import { combineReducers } from 'redux'
import { reducer as reduxFormReducer, FormStateMap } from 'redux-form'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { alerts, IAlertState } from './alerts'
import { authenticate, IAuthenticateState } from './authenticate'
import { members, IMemberState } from './member'

export * from './alerts'
export * from './authenticate'
export * from './member'

export interface ApplicationState {
   router: RouterState,
   form: FormStateMap,
   authenticate: IAuthenticateState,
   alerts: IAlertState,
   members: IMemberState
}

export const rootReducer = (history: History) => combineReducers<ApplicationState>({
   router: connectRouter(history),
   form: reduxFormReducer,
   alerts,
   authenticate: authenticate,
   members: members
})