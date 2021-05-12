import { IMasterApiReducer, IMasterApiState } from './IMaster'

export const isFetching = (master: IMasterApiReducer) => (master.info || { fetching: false }).fetching
export const isCreating = (master: IMasterApiReducer) => (master.info || { createInProgress: false }).createInProgress
export const isUpdating = (master: IMasterApiReducer) => (master.info || { updateInProgress: false }).updateInProgress
export const isListFetching = (master: IMasterApiReducer) => (master.info || { fetchingList: false }).fetchingList
export const isDeleting = (master: IMasterApiReducer) => (master.info || { deleteInProgress: false }).deleteInProgress

export const getMasterData = (master: IMasterApiReducer) => {
   return (master.items && master.items.data)
}

export const getMasterListData = (master: IMasterApiReducer) => {
   return (master.items && master.items.list) || []
}

export const getMasterResources = (master: IMasterApiReducer) => {
   return master ? master.resources : {}
}

export const haseError = (master: IMasterApiReducer) => {
   return master && master.info && master.info.error
}

export const getMasterState = (masterApi: IMasterApiReducer, defaultValue?: any): IMasterApiState => {
   return {
      fetching: isFetching(masterApi)!,
      createInProgress: isCreating(masterApi)!,
      updateInProgress: isUpdating(masterApi)!,
      fetchingList: isListFetching(masterApi)!,
      deleteInProgress: isDeleting(masterApi)!,
      data: getMasterData(masterApi) || defaultValue,
      list: getMasterListData(masterApi),
      resources: getMasterResources(masterApi),
      message: masterApi && masterApi.info && masterApi.info.message,
      error: haseError(masterApi)!
   }
}