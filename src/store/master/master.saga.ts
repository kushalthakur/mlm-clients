import { SagaIterator } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { masterApiFetch, masterApiList, MASTER_API_FETCH, MASTER_API_LIST } from './master.action'
import { getToken, baseURL } from '../selectors'
import { fetchGetRequest } from '../../utils'
import { IMasterApiAction, IMasterApiParams } from './IMaster'

export function* requestMasterOperation(action: IMasterApiAction): IterableIterator<{}> {
   const { type, meta, payload } = action
   try {
      const token = yield call(getToken)
      const params = payload as IMasterApiParams
      let response: any = undefined
      let url = `${yield select(baseURL)}${meta!.keys.url}`
      const body: any = (params && params.body) || {}
      if (meta!.keys.method === 'POST' || meta!.keys.method === 'PUT') {
         console.log(body)
      } else {
         response = yield (call as any)(fetchGetRequest, url, token, meta!.keys.method, params.headers)
      }
      if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.message || 'Fetch Saga Successfully'))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.success(meta!.uniqueKey, meta!.keys, payload.params, response.data || response, response.message || 'List Saga Successfully'))
      } else {
         console.log("No action found in saga")
      }
   } catch (err) {
      if (type === MASTER_API_FETCH.REQUEST) {
         yield put(masterApiFetch.failure(meta!.uniqueKey, meta!.keys, payload.params, err.message))
      } else if (type === MASTER_API_LIST.REQUEST) {
         yield put(masterApiList.failure(meta!.uniqueKey, meta!.keys, payload.params, err.message))
      } else {
         console.log('Catch', err.message)
      }
   }
}

export function* watchMasterApiEvent(): SagaIterator {
   yield takeEvery(MASTER_API_FETCH.REQUEST, requestMasterOperation)
   yield takeEvery(MASTER_API_LIST.REQUEST, requestMasterOperation)
}