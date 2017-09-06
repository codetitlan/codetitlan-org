/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';
import SlidePanel from '../../iron/slide-panel';
import BasicSlide from '../../iron/basic-slide';
// import { isolateGenericComponent } from '../../redstone/helpers/cycle-components';

function makeSlides(sources) {
  const slidesArray = ['ennie', 'mennie', 'miny', 'moe'].map((item) => {
    const slideSources = { ...sources, props: xs.of({ className: `slide-${item}`, contents: item }) };
    const slide = BasicSlide(slideSources);
    return {
      vdom$: slide.DOM,
    };
  });
  return slidesArray;
}

function getPanelMaker(sources) {
  return (slide, key) => (SlidePanel({
    DOM: sources.DOM,
    props: xs.of({ className: `yolo-n${key}`, content$: slide.vdom$ }),
  }).DOM);
}

function intent(sources, scrollBtnClick$) {
  return {
    scrollUpdate$: sources.Scroll.startWith(0),
    newClick$: scrollBtnClick$,
    mcClick$: sources.DOM.select('.slide-panel').events('click'),
  };
}

function model(actions) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    scrollPosition$,
    scrollDownClick$: click$.map(() => scrollPosition$.take(1)).flatten().map(e => e + 200),
    log$: actions.mcClick$.map(e => e.ownerTarget.getBoundingClientRect().top),
  };
}

function view(state$, scrollBtnVdom$, panels$) {
  return xs.combine(state$.scrollPosition$, scrollBtnVdom$, panels$)
    .map(([scrollPosition, scrollButton, panels]) => (
      <div className="mainContainer">
        <div className="scroll-display">
          <span>{scrollPosition}</span>
          {scrollButton}
        </div>
        <section className="panels">
          {panels}
        </section>
      </div>
    ));
}

export default function MasterLayout(sources) {
  const scrollBtn = RsmButton({
    ...sources,
    props: xs.of({
      text: '+200',
      className: 'scroll-down-button',
    }),
  });
  const scrollBtnClick$ = scrollBtn.click$;
  const scrollBtnVdom$ = scrollBtn.DOM;

  // const slides = makeSlides(sources);
  // const panels = slides.map(getPanelMaker(sources));
  // const panels$ = xs.combine(...panels);
  const panels$ = xs.combine(...makeSlides(sources).map(getPanelMaker(sources)));

  const actions = intent(sources, scrollBtnClick$);
  const state$ = model(actions);
  const vdom$ = view(state$, scrollBtnVdom$, panels$);

  return {
    DOM: vdom$,
    Scroll: xs.merge(state$.scrollDownClick$, state$.log$),
    log: state$.log$,
  };
}
