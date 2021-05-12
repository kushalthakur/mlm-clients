import { combineReducers, Reducer } from 'redux'
import { masterApiFetch, masterApiCreate, masterApiUpdate, masterApiList, masterApiDelete } from './master.action'
import { params as paramReducer, items as itemReducer, resources as resourcesReducer } from './master.reducer'
import { IMasterApi, IMasterApiKeys, IMasterApiItemsReducer, IMasterApiInfoReducer, IMasterApiAction, IMasterApiActionCreators, IMasterApiParams } from './IMaster'

export const getMasterActionCreators = (uniqueKey: string, keys: IMasterApiKeys): IMasterApiActionCreators => {
   return {
      requestMaster: (params: IMasterApiParams = {}, resources?: any) => {
         if (keys.request) {
            return masterApiFetch.request(uniqueKey, keys.request!, params!, resources)
         } else {
            return masterApiFetch.failure(uniqueKey, keys.request!, params!, true, "Request Master Error")
         }
      },
      createMaster: (params: IMasterApiParams = {}, resources?: any) => {
         if (keys.create) {
            return masterApiCreate.request(uniqueKey, keys.create!, params!, resources)
         } else {
            return masterApiCreate.failure(uniqueKey, keys.create!, params!, true, "Create Master Error")
         }
      },
      updateMaster: (params: IMasterApiParams = {}, resources?: any) => {
         if (keys.update) {
            return masterApiUpdate.request(uniqueKey, keys.update!, params!, resources)
         } else {
            return masterApiUpdate.failure(uniqueKey, keys.update!, params!, true, "Update Master Error")
         }
      },
      listMaster: (params: IMasterApiParams = {}, resources?: any) => {
         if (keys.list) {
            return masterApiList.request(uniqueKey, keys.list!, params!, resources)
         } else {
            return masterApiList.failure(uniqueKey, keys.list!, params!, true, "List Master Error");
         }
      },
      deleteMaster: (params: IMasterApiParams = {}, resources?: any) => {
         if (keys.delete) {
            return masterApiDelete.request(uniqueKey, keys.delete!, params!, resources)
         } else {
            return masterApiDelete.failure(uniqueKey, keys.delete!, params!, true, "Delete Master Error")
         }
      }
   }
}

export const onlyForEndpoint = (uniqueKey: string, reducer: any) => (state = {}, action: any = {}) =>
   typeof action.meta === 'undefined' ? state : action.meta.uniqueKey === uniqueKey ? reducer(state, action) : state

export const master = (
   items: Reducer<IMasterApiItemsReducer, IMasterApiAction>,
   info: Reducer<IMasterApiInfoReducer, IMasterApiAction>,
   resources: Reducer<IMasterApiInfoReducer, IMasterApiAction>,
   requestMasterActionCreators: IMasterApiActionCreators
) => ({
   reducers: combineReducers({
      items, info, resources
   }),
   ...requestMasterActionCreators
})

export const createMasterApi = (uniqueKey: string, keys: IMasterApiKeys): IMasterApi => {
   const items = onlyForEndpoint(uniqueKey, itemReducer)
   const params = onlyForEndpoint(uniqueKey, paramReducer)
   const resources = onlyForEndpoint(uniqueKey, resourcesReducer)
   const masterActionCreator = getMasterActionCreators(uniqueKey, keys)
   return master(items, params, resources, masterActionCreator)
}