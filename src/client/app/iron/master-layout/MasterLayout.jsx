/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

function intent(sources) {
  return {
    scrollUpdate$: sources.Scroll.startWith('yolo'),
  };
}

function model(actions) {
  return actions.scrollUpdate$.map(val => val);
}

function view(state$) {
  return state$.map(value => (<span className="scroll-display">{value}</span>));
}

export default function MasterLayout(sources) {
  return {
    DOM: view(model(intent(sources))),
  };
}
