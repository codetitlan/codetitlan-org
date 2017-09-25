/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';
import SlidePanel from '../../iron/slide-panel';
import BasicSlide from '../../iron/basic-slide';
// import { isolateGenericComponent } from '../../redstone/helpers/cycle-components';

function getScrollButton(sources) {
  const scrollBtn = RsmButton({
    ...sources,
    props: xs.of({ text: '+200', className: 'scroll-down-button' }),
  });
  return {
    vdom$: scrollBtn.DOM,
    click$: scrollBtn.click$,
  };
}

function makeSlides(sources) {
  return ['ennie', 'mennie', 'miny', 'moe'].map((item) => {
    const slide = BasicSlide({
      ...sources,
      props: xs.of({ className: `slide-${item}`, contents: item }),
    });
    return { vdom$: slide.DOM };
  });
}

function panelMakerMaker(sources) {
  return (slide, key) => SlidePanel({
    DOM: sources.DOM,
    props: xs.of({ className: `yolo-n${key}`, content$: slide.vdom$ }),
  }).DOM;
}

function intent(sources) {
  const scrollButton = getScrollButton(sources);
  const panelsVdom$ = xs.combine(
    ...makeSlides(sources).map(panelMakerMaker(sources)),
  );

  return {
    actions: {
      scrollUpdate$: sources.Scroll.startWith(0),
      newClick$: scrollButton.click$,
      mcClick$: sources.DOM.select('.slide-panel').events('click'),
    },
    vdoms: {
      scrollButtonVdom$: scrollButton.vdom$,
      panelsVdom$,
    },
  };
}

function model({ actions, vdoms }) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  return {
    ...vdoms,
    scrollPosition$,
    scrollDownClick$: click$.map(() => scrollPosition$.take(1)).flatten().map(e => e + 200),
    log$: actions.mcClick$.map(e => e.ownerTarget.getBoundingClientRect().top),
  };
}

function view(state) {
  return xs.combine(state.scrollPosition$, state.scrollButtonVdom$, state.panelsVdom$)
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
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: xs.merge(state.scrollDownClick$, state.log$),
    Log: state.log$,
  };
}
