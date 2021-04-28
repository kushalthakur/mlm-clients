import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { watchMasterApiEvent } from '../master'

export default function* root(): SagaIterator {
   yield fork(watchMasterApiEvent)
}
