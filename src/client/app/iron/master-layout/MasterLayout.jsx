/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

function intent(domSources) {
  return {
    scrollUpdate$: domSources
      .select('#root')
      .events('scroll'),
  };
}

function model(actions) {
  return actions.scrollUpdate$.map(val => val).startWith(0);
}

function view(state$) {
  return state$.map(value => (<span>{value}</span>));
}

export default function MasterLayout(sources) {
  return {
    DOM: view(model(intent(sources.DOM))),
  };
}
