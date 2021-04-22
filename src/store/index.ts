import { Store, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { History, createBrowserHistory } from 'history'
import { rootReducer } from '../reducers'
import { alerts } from '../actions'
import { config } from '../config'
import { getToken, removeToken } from './selectors'

export const history: History = createBrowserHistory()

// axios instance
const instance: AxiosInstance = axios.create({
   baseURL: `${config.baseURL}/api`,
   responseType: "json"
})
// request interceptors
instance.interceptors.request.use((req: AxiosRequestConfig) => {
   let appInitializationState = store.getState().authenticate
   if (appInitializationState && appInitializationState.isAuthenticated) {
      req.headers.Authorization = `Bearer ${getToken()}`
   }
   return req
})
// response interceptors
instance.interceptors.response.use((response: AxiosResponse) => {
   response && response.data && store.dispatch(alerts.error(response.data.message))
   return response.data
}, error => {
   if (error && error.response && (error.response.status === 400 || error.response.status === 404 || error.response.status === 422 || error.response.status === 500)) {
      error && error.response && error.response.data && store.dispatch(alerts.error(error.response.data.message))
      return error.response.data
   } else if (error.response.status === 403 || error.response.status === 401) {
      removeToken()
      window.location.reload()
      return new Error('Unauthorized')
   }
   throw error;
})

const store: Store = configureStore(history)
function configureStore(history: History): Store {
   const store: Store = createStore(
      rootReducer(history),
      applyMiddleware(
         axiosMiddleware(instance),
         thunk
      )
   )
   return store
}

export default store