/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

function intent(sources) {
  return {
    scrollUpdate$: sources.Scroll.startWith(0),
    newClick$: sources.DOM.select('.scroll-down-button').events('click'),
  };
}

function model(actions) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    scrollPosition$,
    scrollDownClick$: click$.mapTo(500),
    log$: click$.map(val => val.target),
  };
}

function view(state$) {
  return state$.scrollPosition$.map(value => (
    <div className="scroll-display">
      <span>{value}</span>
      <button className="scroll-down-button">Scroll down</button>
    </div>
  ));
}

export default function MasterLayout(sources) {
  const state$ = model(intent(sources));
  return {
    DOM: view(state$),
    Scroll: state$.scrollDownClick$,
    log: state$.log$,
  };
}
