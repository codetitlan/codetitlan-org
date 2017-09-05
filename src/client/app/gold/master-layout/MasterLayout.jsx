/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';

function intent(sources, scrollButtonClick$) {
  return {
    scrollUpdate$: sources.Scroll.startWith(0),
    newClick$: scrollButtonClick$,
    slideElements$: sources.DOM.select('.slide').elements(),
    mcClick$: sources.DOM.select('.mainContainer').events('click'),
  };
}

function model(actions) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    scrollPosition$,
    scrollDownClick$: click$
      .map(() => scrollPosition$.take(1))
      .flatten()
      .map(e => e + 200),
    log$: actions.mcClick$
      .map(e => e.ownerTarget.offsetHeight),
    // log$: actions.slideElements$
    //   .filter(e => (e.length > 0))
    //   .map(a => a.map(e => e.offsetHeight)),
  };
}

function view(state$, scrollButtonVdom$) {
  return xs.combine(state$.scrollPosition$, scrollButtonVdom$)
    .map(([scrollPosition, scrollButtonVdom]) => (
      <div className="mainContainer">
        <div className="scroll-display">
          <span>{scrollPosition}</span>
          {scrollButtonVdom}
        </div>
        <div className="slide">nigg</div>
        {['ennie', 'meenie', 'minnie', 'moe'].map(text => (
          <div className="slide">{text}</div>
        ))}
      </div>
    ));
}

export default function MasterLayout(sources) {
  const rsmButton = RsmButton({
    DOM: sources.DOM,
    props: xs.of({
      text: '+200',
      className: 'scroll-down-button',
    }),
  });
  const scrollButtonClick$ = rsmButton.click$;
  const scrollButtonVdom$ = rsmButton.DOM;

  const actions = intent(sources, scrollButtonClick$);
  const state$ = model(actions);
  const vdom$ = view(state$, scrollButtonVdom$);

  return {
    DOM: vdom$,
    Scroll: state$.scrollDownClick$,
    log: state$.log$,
  };
}
