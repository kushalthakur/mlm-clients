import { Store, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import createSagaMiddleware from 'redux-saga'
import { History, createBrowserHistory } from 'history'
import { rootReducer } from '../reducers'
import rootSaga from './saga'
import { alerts } from '../actions'
import { config } from '../config'
import { getToken, isTokenExpire } from './selectors'

export const history: History = createBrowserHistory()

// axios instance
const instance: AxiosInstance = axios.create({
   baseURL: `${config.baseURL}/api`,
   responseType: "json"
})
// request interceptors
instance.interceptors.request.use(async (req: AxiosRequestConfig) => {
   await isTokenExpire()
   let appInitializationState = store.getState().authenticate
   if (appInitializationState && appInitializationState.isAuthenticated) {
      req.headers.Authorization = `Bearer ${getToken()}`
   }
   return req
})
// response interceptors
instance.interceptors.response.use((response: AxiosResponse) => {
   if (response && (response.status === 200 || response.status === 202)) {
      // response && response.data && store.dispatch(alerts.success(response.data.message))
   }
   return response.data
}, error => {
   if (error && error.response && (error.response.status === 400 || error.response.status === 404 || error.response.status === 422 || error.response.status === 500)) {
      error && error.response && error.response.data && store.dispatch(alerts.error(error.response.data.message))
      return error.response.data
   } else if (error.response.status === 403 || error.response.status === 401) {
      return new Error('Unauthorized')
   }
   throw error;
})

const store: Store = configureStore(history)
function configureStore(history: History): Store {
   const sagaMiddleware = createSagaMiddleware()
   const store: Store = createStore(
      rootReducer(history),
      applyMiddleware(
         axiosMiddleware(instance),
         thunk,
         sagaMiddleware
      )
   )
   sagaMiddleware.run(rootSaga)
   return store
}

export default store