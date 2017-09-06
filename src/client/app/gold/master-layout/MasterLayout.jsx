/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';
import SlidePanel from '../../iron/slide-panel';
// import { isolateGenericComponent } from '../../redstone/helpers/cycle-components';

function intent(sources, scrollButtonClick$) {
  return {
    scrollUpdate$: sources.Scroll.startWith(0),
    newClick$: scrollButtonClick$,
    mcClick$: sources.DOM.select('.slide').events('click'),
  };
}

function model(actions) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    scrollPosition$,
    scrollDownClick$: click$.map(() => scrollPosition$.take(1)).flatten().map(e => e + 200),
    log$: actions.mcClick$.map(e => e.ownerTarget.getBoundingClientRect()),
  };
}

function view(state$, scrollButtonVdom$, slidePanelVdom$) {
  return xs.combine(state$.scrollPosition$, scrollButtonVdom$, slidePanelVdom$)
    .map(([scrollPosition, scrollButtonVdom, slidePanelVdom]) => (
      <div className="mainContainer">
        <div className="scroll-display">
          <span>{scrollPosition}</span>
          {scrollButtonVdom}
        </div>
        {slidePanelVdom}
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

  // const slidePanel = isolateGenericComponent(SlidePanel, 'someid', sources, {
  //   content: 'yolo',
  //   content$: scrollButtonVdom$,
  // });
  const slidePanel = SlidePanel({
    DOM: sources.DOM,
    props: xs.of({ content: 'yolo', content$: scrollButtonVdom$ }),
  });

  const slidePanelVdom$ = slidePanel.DOM;

  const actions = intent(sources, scrollButtonClick$);
  const state$ = model(actions);
  const vdom$ = view(state$, scrollButtonVdom$, slidePanelVdom$);

  return {
    DOM: vdom$,
    Scroll: state$.scrollDownClick$,
    log: state$.log$,
  };
}
