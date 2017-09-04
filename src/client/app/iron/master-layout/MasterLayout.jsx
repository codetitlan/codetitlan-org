/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';

function intent(sources) {
  const rsmButton = RsmButton({ DOM: sources.DOM, props: xs.of({ text: 'Click me dude' }) });
  const rsmButtonVdom$ = rsmButton.DOM;
  const rsmButtonClick$ = rsmButton.click$;

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
