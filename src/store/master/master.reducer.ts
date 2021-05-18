import { IMasterApiAction, IMasterApiInfoReducer, IMasterApiItemsReducer } from './IMaster'
import { MASTER_API_PAGINATOR, MASTER_API_CREATE, MASTER_API_FETCH, MASTER_API_LIST, MASTER_API_UPDATE } from './master.action'

export const params = (params: IMasterApiInfoReducer = {}, action: IMasterApiAction) => {
   switch (action.type) {
      case MASTER_API_PAGINATOR.REQUEST:
      case MASTER_API_FETCH.REQUEST:
      case MASTER_API_CREATE.REQUEST:
      case MASTER_API_UPDATE.REQUEST:
      case MASTER_API_LIST.REQUEST:
         return {
            page: action.payload.page || 0,
            pageSize: action.payload.pageSize || 10,
            params: action.payload.params,
            fetching: action.type === MASTER_API_FETCH.REQUEST ? true : params.fetching,
            createInProgress: action.type === MASTER_API_CREATE.REQUEST ? true : params.createInProgress,
            updateInProgress: action.type === MASTER_API_UPDATE.REQUEST ? true : params.updateInProgress,
            fetchingList: action.type === MASTER_API_LIST.REQUEST ? true : params.fetchingList,
            message: undefined,
            error: false
         }
      case MASTER_API_PAGINATOR.SUCCESS:
      case MASTER_API_FETCH.SUCCESS:
      case MASTER_API_CREATE.SUCCESS:
      case MASTER_API_UPDATE.SUCCESS:
      case MASTER_API_LIST.SUCCESS:
         return {
            totalCount: action.payload.totalCount,
            params: action.payload.params,
            fetching: action.type === MASTER_API_FETCH.SUCCESS ? false : params.fetching,
            createInProgress: action.type === MASTER_API_CREATE.SUCCESS ? false : params.createInProgress,
            updateInProgress: action.type === MASTER_API_UPDATE.SUCCESS ? false : params.updateInProgress,
            fetchingList: action.type === MASTER_API_LIST.SUCCESS ? false : params.fetchingList,
            message: action.payload.message,
            error: action.payload.error
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
            error: action.payload.error
         }
      default:
         return params
   }
}

export const items = (items: IMasterApiItemsReducer = {}, action: any = {}) => {
   switch (action.type) {
      case MASTER_API_PAGINATOR.SUCCESS:
      case MASTER_API_FETCH.SUCCESS:
      case MASTER_API_UPDATE.SUCCESS:
         return {
            ...items,
            data: action.payload.items
         }
      case MASTER_API_CREATE.SUCCESS:
         let errors = Object.keys(action.payload.items)
         let error = errors.includes('error')
         if (error)
            return
         else
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
      case MASTER_API_PAGINATOR.SUCCESS:
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