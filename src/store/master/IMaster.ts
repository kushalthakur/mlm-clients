import { Reducer, Action } from 'redux'
import { IStandardAction } from '../../actions';

export interface IMasterApiRequest {
   url: string
   method: string
}

export interface IMasterApiKeys {
   request?: IMasterApiRequest
   create?: IMasterApiRequest
   update?: IMasterApiRequest
   list?: IMasterApiRequest
   delete?: IMasterApiRequest
}

export interface IMasterApiParams {
   queryParams?: { [key: string]: number | string | boolean }
   body?: Object
   urlParams?: { [key: string]: number | string }
   headers?: Headers
}

export interface IMasterApiRequestAction {
   (params?: IMasterApiParams, resources?: any): IStandardAction
}
export interface IMasterApiCreateAction {
   (params?: IMasterApiParams, resources?: any): IStandardAction
}
export interface IMasterApiUpdateAction {
   (params?: IMasterApiParams, resources?: any): IStandardAction
}
export interface IMasterApiListAction {
   (params?: IMasterApiParams, resources?: any): IStandardAction
}
export interface IMasterApiDeleteAction {
   (params?: IMasterApiParams, resources?: any): IStandardAction
}

export interface IMasterApiActionCreators {
   requestMaster: IMasterApiRequestAction
   createMaster: IMasterApiCreateAction
   updateMaster: IMasterApiUpdateAction
   listMaster: IMasterApiListAction
   deleteMaster: IMasterApiDeleteAction
}

export interface IMasterApiInfoReducer {
   params?: IMasterApiParams
   fetching?: boolean
   fetchingList?: boolean
   updateInProgress?: boolean
   createInProgress?: boolean
   deleteInProgress?: boolean
   message?: string
   error?: boolean
}

export interface MasterApiResourcesReducer {
   [key: string]: any;
}

export interface IMasterApiReducer {
   info: IMasterApiInfoReducer
   resources: MasterApiResourcesReducer
   items: IMasterApiItemsReducer
}

export interface IMasterApi extends IMasterApiActionCreators {
   reducers: Reducer<IMasterApiReducer>
}

export interface IMasterApiItemsReducer {
   data?: any
   list?: Array<any>
}

export interface IMasterApiMeta {
   uniqueKey: string;
   keys: IMasterApiRequest;
}

export interface IMasterApiAction extends Action {
   meta?: IMasterApiMeta
   payload?: any
}

export interface IMasterApiState {
   fetching?: boolean
   fetchingList?: boolean
   updateInProgress?: boolean
   createInProgress?: boolean
   deleteInProgress?: boolean
   data: any
   resources: any
   error: boolean
   message: string | undefined
   list: Array<any>
}