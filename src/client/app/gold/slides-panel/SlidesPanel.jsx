/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';
import SlidePanel from '../../iron/slide-panel';
import BasicSlide from '../../iron/basic-slide';
import { isolateImplicit } from '../../redstone/helpers/cycle-components';

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

function slideMakerMaker(sources) {
  return function slideMaker(slides) {
    return slides.map((slide, key) => {
      const basicSlide = isolateImplicit(
        BasicSlide,
        sources,
        {
          className: `slide-${key}`,
          contents: (
            <div>
              <h4>{slide.title}</h4>
              <p>{slide.message}</p>
            </div>
          ),
        },
      );
      return { DOM: basicSlide.DOM };
    });
  };
}

function panelMakerMaker(sources) {
  return function panelMaker(slides) {
    return slides.map((slide, key) => SlidePanel({
      DOM: sources.DOM,
      props: xs.of({ className: `yolo-n${key}`, content$: slide.DOM }),
    }));
  };
}

function intent(sources) {
  const panels$ = sources.props
    .map(props => props.slides$)
    .flatten()
    .map(slideMakerMaker(sources))
    .map(panelMakerMaker(sources))
    .debug('pmm');

  const scrollButton = getScrollButton(sources);

  return {
    actions: {
      scrollUpdate$: sources.Scroll.startWith(0),
      newClick$: scrollButton.click$,
      mcClick$: sources.DOM.select('.slide-panel').events('click'),
    },
    vdoms: {
      scrollButton$: scrollButton.vdom$,
      panels$: panels$
        .map(panels => panels.map(panel => panel.DOM))
        .debug('on assy'),
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

function view({ scrollPosition$, scrollButton$, panels$ }) {
  xs.combine(scrollPosition$, scrollButton$, panels$).debug('on view')
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
  return xs.of(<div>Yoloman</div>);
}

export default function (sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: xs.merge(state.scrollDownClick$, state.log$),
    Log: state.log$,
  };
}
