import { SagaIterator } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
   requestPaginator, masterApiCreate, masterApiFetch, masterApiList, masterApiUpdate, masterApiDelete,
   MASTER_API_PAGINATOR, MASTER_API_CREATE, MASTER_API_FETCH, MASTER_API_LIST, MASTER_API_UPDATE, MASTER_API_DELETE
} from './master.action'
import { getToken, baseURL } from '../selectors'
import { fetchGetRequest, fetchPostRequest, generateUrlWithRequestParams, encodeQueryData } from '../../utils'
import { IMasterApiAction, IMasterApiParams } from './IMaster'
import { history } from '../'

export function* requestMasterOperation(action: IMasterApiAction): IterableIterator<{}> {
   const { type, meta, payload } = action
   try {
      let token = yield call(getToken)
      const params = payload.params as IMasterApiParams
      let resp: any = undefined
      let url = `${yield select(baseURL)}${meta!.keys.url}`
      url = getFullUrl(url, payload.params)
      const body: any = (params && params.body) || {}
      if (meta!.keys.method === 'POST' || meta!.keys.method === 'PUT') {
         resp = yield (call as any)(fetchPostRequest, url, token, body, meta!.keys.method, params.headers)
      } else {
         resp = yield (call as any)(fetchGetRequest, url, token, meta!.keys.method, params.headers)
      }
      if (type === MASTER_API_PAGINATOR.REQUEST) {
         yield put(requestPaginator.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.totalCount, resp.error, resp.message))
      } else if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.error, resp.message || 'Fetched Successfully'))
      } else if (type === MASTER_API_CREATE.REQUEST) {
         yield put(masterApiCreate.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.error, resp.message || 'Created Successfully'))
      } else if (type === MASTER_API_UPDATE.REQUEST) {
         !resp.error && (yield call(redirectTo, '/members'))
         yield put(masterApiUpdate.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.error, resp.message || 'Updated Successfully'))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.error, resp.message || 'List Successfully'))
      } else if (type === MASTER_API_DELETE.REQUEST) {
         yield put(masterApiDelete.success(meta!.uniqueKey, meta!.keys, payload.params, resp.data || resp, resp.error, resp.message || 'Delete Successfully'))
      } else {
         console.log("No action found in saga")
      }
   } catch (err: any) {
      if (type === MASTER_API_PAGINATOR.REQUEST) {
         yield put(requestPaginator.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_CREATE.REQUEST) {
         yield put(masterApiCreate.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_UPDATE.REQUEST) {
         yield put(masterApiUpdate.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_DELETE.REQUEST) {
         yield put(masterApiDelete.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else {
         console.log('Catch', err.message)
      }
   }
}

export function* watchMasterApiEvent(): SagaIterator {
   yield takeEvery(MASTER_API_PAGINATOR.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_FETCH.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_CREATE.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_UPDATE.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_LIST.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_DELETE.REQUEST, requestMasterOperation)
}

const getFullUrl = (baseUrl: string, params: IMasterApiParams) => {
   if (params && params.urlParams) {
      baseUrl = generateUrlWithRequestParams(baseUrl, params.urlParams)
   }
   if (params && (params.page || params.pageSize)) {
      baseUrl = `${baseUrl}?limit=${params.pageSize || 10}&page=${params.page || 0}&`
   }
   if (params && params.queryParams) {
      baseUrl = `${baseUrl}${encodeQueryData(params.queryParams)}`
   }
   return baseUrl
}

export const redirectTo = (location: string) => {
   history.push(location)
}