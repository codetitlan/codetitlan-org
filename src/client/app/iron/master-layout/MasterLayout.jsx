/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';

function intent(sources, scrollButtonClick$) {
  return {
    scrollUpdate$: sources.Scroll.startWith(0),
    newClick$: scrollButtonClick$,
  };
}

function model(actions) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    scrollPosition$,
    scrollDownClick$: click$.mapTo(500),
    log$: click$.map(clickEvt => clickEvt),
  };
}

function view(state$, scrollButtonVdom$) {
  return xs.combine(state$.scrollPosition$, scrollButtonVdom$)
    .map(([scrollPosition, scrollButtonVdom]) => (
      <div className="scroll-display">
        <span>{scrollPosition}</span>
        {scrollButtonVdom}
      </div>
    ));
}

export default function MasterLayout(sources) {
  const rsmButton = RsmButton({
    DOM: sources.DOM,
    props: xs.of({ text: 'Click me dude', className: 'scroll-down-button' }),
  });
  const scrollButtonClick$ = rsmButton.click$;
  const scrollButtonVdom$ = rsmButton.DOM;

  const actions = intent(sources, scrollButtonClick$);
  const state$ = model(actions);

  return {
    DOM: view(state$, scrollButtonVdom$),
    Scroll: state$.scrollDownClick$,
    log: state$.log$,
  };
}
