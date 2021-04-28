import { combineReducers } from 'redux'
import { reducer as reduxFormReducer, FormStateMap } from 'redux-form'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { alerts, IAlertState } from './alerts'
import { authenticate, IAuthenticateState } from './authenticate'
import { modal, IModalState } from './modal'
import { tree, ITreeState } from './tree'
import { IMasterApiReducer } from '../store/master'
import { masterMembers } from '../store/master.store'

export * from './alerts'
export * from './authenticate'
export * from './modal'
export * from './tree'

export interface ApplicationState {
   router: RouterState,
   form: FormStateMap,
   alerts: IAlertState,
   authenticate: IAuthenticateState,
   modalState: IModalState,
   tree: ITreeState,
   members: ({
      manageMembers: IMasterApiReducer
   })
}

export const rootReducer = (history: History) => combineReducers<ApplicationState>({
   router: connectRouter(history),
   form: reduxFormReducer,
   alerts,
   authenticate: authenticate,
   modalState: modal,
   tree: tree,
   members: combineReducers({
      manageMembers: masterMembers.reducers
   })
})