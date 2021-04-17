import { Store, createStore } from 'redux'
import { History, createBrowserHistory } from 'history'
import { rootReducer } from '../reducers'

export const history: History = createBrowserHistory()

const store: Store = configureStore(history)

function configureStore(history: History): Store {
   const store: Store = createStore(
      rootReducer(history)
   )
   return store
}

export default store