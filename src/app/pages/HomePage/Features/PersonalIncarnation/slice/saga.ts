import { select, takeLatest } from 'redux-saga/effects';
import { personalIncarnationActions as actions } from '.';
import { selectCurrentDialog } from './selectors';

function* doSomething() {
  const { currentDialog, currentDialogset } = yield select(selectCurrentDialog);
  yield console.log('iwashere', currentDialog, currentDialogset);
}

export function* personalIncarnationSaga() {
  yield takeLatest(actions.moveAhead.type, doSomething);
}
