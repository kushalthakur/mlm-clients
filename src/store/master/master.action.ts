import { defineRequestType, IRequestType, IStandardAction } from '../../actions'
import { IMasterApiParams, IMasterApiRequest } from './IMaster'

export const MASTER_API_FETCH: IRequestType = defineRequestType("@REDUX_MASTER_API_FETCH")
export const MASTER_API_LIST: IRequestType = defineRequestType("@REDUX_MASTER_API_LIST")

export const masterApiFetch = {
   request: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, resources?: any): IStandardAction => {
      return {
         type: MASTER_API_FETCH.REQUEST,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params, resources
         }
      }
   },
   success: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, items: any, message: string): IStandardAction => {
      return {
         type: MASTER_API_FETCH.SUCCESS,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params, items, message
         }
      }
   },
   failure: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, message: string): IStandardAction => {
      return {
         type: MASTER_API_FETCH.FAILURE,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params, message
         }
      }
   }
}

export const masterApiCreate = {
   request: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, resources?: any): any => {

   },
   success: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, items: any, message: string): any => {

   },
   failure: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, message: string): any => {

   }
}

export const masterApiUpdate = {
   request: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, resources?: any): any => {

   },
   success: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, items: any, message: string): any => {

   },
   failure: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, message: string): any => {

   }
}

export const masterApiList = {
   request: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, resources?: any): IStandardAction => {
      return {
         type: MASTER_API_LIST.REQUEST,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params,
            resources
         }
      };
   },
   success: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, items: any, message: string): IStandardAction => {
      return {
         type: MASTER_API_LIST.SUCCESS,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params, items, message
         }
      };
   },
   failure: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, message: string): IStandardAction => {
      return {
         type: MASTER_API_LIST.FAILURE,
         meta: {
            uniqueKey, keys
         },
         payload: {
            params, message
         }
      };
   }
}

export const masterApiDelete = {
   request: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, resources?: any): any => {

   },
   success: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, items: any, message: string): any => {

   },
   failure: (uniqueKey: string, keys: IMasterApiRequest, params: IMasterApiParams, message: string): any => {

   }
}