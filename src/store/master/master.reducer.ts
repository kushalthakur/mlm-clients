import { IMasterApiAction, IMasterApiInfoReducer, IMasterApiItemsReducer } from './IMaster'
import { MASTER_API_CREATE, MASTER_API_FETCH, MASTER_API_LIST, MASTER_API_UPDATE } from './master.action'

export const params = (params: IMasterApiInfoReducer = {}, action: IMasterApiAction) => {
   switch (action.type) {
      case MASTER_API_FETCH.REQUEST:
      case MASTER_API_CREATE.REQUEST:
      case MASTER_API_UPDATE.REQUEST:
      case MASTER_API_LIST.REQUEST:
         return {
            params: action.payload.params,
            fetching: action.type === MASTER_API_FETCH.REQUEST ? true : params.fetching,
            createInProgress: action.type === MASTER_API_CREATE.REQUEST ? true : params.createInProgress,
            updateInProgress: action.type === MASTER_API_UPDATE.REQUEST ? true : params.updateInProgress,
            fetchingList: action.type === MASTER_API_LIST.REQUEST ? true : params.fetchingList,
            message: undefined,
            error: false
         }
      case MASTER_API_FETCH.SUCCESS:
      case MASTER_API_CREATE.SUCCESS:
      case MASTER_API_UPDATE.SUCCESS:
      case MASTER_API_LIST.SUCCESS:
         return {
            params: action.payload.params,
            fetching: action.type === MASTER_API_FETCH.SUCCESS ? false : params.fetching,
            createInProgress: action.type === MASTER_API_CREATE.SUCCESS ? false : params.createInProgress,
            updateInProgress: action.type === MASTER_API_UPDATE.SUCCESS ? false : params.updateInProgress,
            fetchingList: action.type === MASTER_API_LIST.SUCCESS ? false : params.fetchingList,
            message: action.payload.message,
            error: false
         }
      case MASTER_API_FETCH.FAILURE:
      case MASTER_API_CREATE.FAILURE:
      case MASTER_API_UPDATE.FAILURE:
      case MASTER_API_LIST.FAILURE:
         return {
            params: action.payload.params,
            fetching: action.type === MASTER_API_FETCH.FAILURE ? false : params.fetching,
            createInProgress: action.type === MASTER_API_CREATE.FAILURE ? false : params.createInProgress,
            updateInProgress: action.type === MASTER_API_UPDATE.FAILURE ? false : params.updateInProgress,
            fetchingList: action.type === MASTER_API_LIST.FAILURE ? false : params.fetchingList,
            message: action.payload.message,
            error: true
         }
      default:
         return params
   }
}

export const items = (items: IMasterApiItemsReducer = {}, action: any = {}) => {
   console.log('items ', items.data)
   console.log('action ', action.payload.items)
   switch (action.type) {
      case MASTER_API_FETCH.SUCCESS:
      case MASTER_API_UPDATE.SUCCESS:
         return {
            ...items,
            data: action.payload.items
         }
      case MASTER_API_CREATE.SUCCESS:
         return {
            ...items,
            data: [action.payload.items, ...items.data]
         }
      case MASTER_API_LIST.SUCCESS:
         return {
            ...items,
            list: action.payload.items
         }
      default:
         return items
   }
}

export const resources = (resources: any = {}, action: any = {}) => {
   switch (action.type) {
      case MASTER_API_FETCH.SUCCESS:
      case MASTER_API_CREATE.SUCCESS:
      case MASTER_API_UPDATE.SUCCESS:
      case MASTER_API_LIST.SUCCESS:
         {
            return {
               ...action.resources,
               ...action.payload.resources
            }
         }
      default:
         return resources
   }
}