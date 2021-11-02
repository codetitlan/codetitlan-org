import { takeLatest } from 'redux-saga/effects';
import { welcomeDialogueActions as actions } from '.';

function* doSomething() {
  yield console.log('Welcome dialog saga called, not implemented');
}

export function* welcomeDialogueSaga() {
  yield takeLatest(actions.someAction.type, doSomething);
}
