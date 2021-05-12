import { SagaIterator } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { masterApiCreate, masterApiFetch, masterApiList, masterApiUpdate, MASTER_API_CREATE, MASTER_API_FETCH, MASTER_API_LIST, MASTER_API_UPDATE } from './master.action'
import { getToken, baseURL } from '../selectors'
import { fetchGetRequest, fetchPostRequest } from '../../utils'
import { IMasterApiAction, IMasterApiParams } from './IMaster'

export function* requestMasterOperation(action: IMasterApiAction): IterableIterator<{}> {
   const { type, meta, payload } = action
   try {
      const token = yield call(getToken)
      const params = payload.params as IMasterApiParams
      let response: any = undefined
      let url = `${yield select(baseURL)}${meta!.keys.url}`
      const body: any = (params && params.body) || {}
      if (meta!.keys.method === 'POST' || meta!.keys.method === 'PUT') {
         response = yield (call as any)(fetchPostRequest, url, token, body, meta!.keys.method, params.headers)
      } else {
         response = yield (call as any)(fetchGetRequest, url, token, meta!.keys.method, params.headers)
      }
      if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.error, response.message || 'Fetched Successfully'))
      } else if (type === MASTER_API_CREATE.REQUEST) {
         yield put(masterApiCreate.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.error, response.message || 'Created Successfully'))
      } else if (type === MASTER_API_UPDATE.REQUEST) {
         yield put(masterApiUpdate.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.error, response.message || 'Updated Successfully'))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.error, response.message || 'List Successfully'))
      } else {
         console.log("No action found in saga")
      }
   } catch (err) {
      if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_CREATE.REQUEST) {
         yield put(masterApiCreate.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_UPDATE.REQUEST) {
         yield put(masterApiUpdate.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.failure(meta!.uniqueKey, meta!.keys, payload.params, true, err.message))
      } else {
         console.log('Catch', err.message)
      }
   }
}

export function* watchMasterApiEvent(): SagaIterator {
   yield takeEvery(MASTER_API_FETCH.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_CREATE.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_UPDATE.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_LIST.REQUEST, requestMasterOperation)
}