import { combineReducers } from 'redux'
import { reducer as reduxFormReducer, FormStateMap } from 'redux-form'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { alerts, IAlertState } from './alerts'
import { authenticate } from './authenticate'

export * from './authenticate'
export * from './alerts'

export interface ApplicationState {
   router: RouterState,
   form: FormStateMap,
   authenticate: any,
   alerts: IAlertState
}

export const rootReducer = (history: History) => combineReducers<ApplicationState>({
   router: connectRouter(history),
   form: reduxFormReducer,
   authenticate: authenticate,
   alerts
})