import { select, takeLatest, delay, put } from 'redux-saga/effects';
import { personalIncarnationActions as actions } from '.';
import { selectIncarnationId } from './selectors';
import { PersonalIncarnationState } from './types';

function* doSomething() {
  yield delay(500);
  const incarnationId = yield select(selectIncarnationId);
  const mockResponse: PersonalIncarnationState = {
    incarnationId: incarnationId,
    piState: 'loaded',
    lastRefresh: new Date().toISOString(),
    demeanorId: 'asd',
  };
  yield put(actions.initializeIncarnation(mockResponse));
}

export function* personalIncarnationSaga() {
  yield takeLatest(actions.loadIncarnation.type, doSomething);
}
