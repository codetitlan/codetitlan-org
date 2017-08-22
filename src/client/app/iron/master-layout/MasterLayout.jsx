/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

function intent(sources) {
  return {
    scrollUpdate$: sources.Scroll.startWith('0px'),
    requestScroll$: sources.DOM.select('.scroller-button').events('click'),
  };
}

function model(actions) {
  return {
    scrollValue$: actions.scrollUpdate$.map(val => val),
    scrollerClick$: actions.requestScroll$.map(() => 600),
  };
}

function view(state$) {
  return state$.scrollValue$.map(([scrollValue]) => (
    <div className="scroll-display">
      <span>{scrollValue}</span>
      <button className="scroller-button">Scroll down 600px</button>
    </div>
  ));
}

export default function MasterLayout(sources) {
  const actions = intent(sources);
  const state$ = model(actions);
  return {
    DOM: view(state$),
    Scroll: state$.scrollerClick$,
  };
}
