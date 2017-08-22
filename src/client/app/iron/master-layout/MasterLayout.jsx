/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

function intent(sources) {
  return {
    scrollUpdate$: sources.Scroll.startWith('yolo'),
    scrollDownClick$: sources.DOM.select('.scroll-down-button')
      .events('click'),
  };
}

function model(actions) {
  return {
    scrollPosition$: actions.scrollUpdate$,
    scrollDownClick$: actions.scrollDownClick$.mapTo(600),
  };
}

function view(state$) {
  return state$.scrollPosition$.map(value => (
    <div className="scroll-display">
      <button className="scroll-down-button">Scroll down</button>
      <span>{value}</span>
    </div>
  ));
}

export default function MasterLayout(sources) {
  const state$ = model(intent(sources));
  return {
    DOM: view(state$),
    Scroll: state$.scrollDownClick$,
  };
}
