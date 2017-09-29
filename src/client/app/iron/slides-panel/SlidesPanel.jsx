/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import SlidePanel from '../../iron/slide-panel';
import BasicSlide from '../../iron/basic-slide';
import { isolateImplicit } from '../../redstone/helpers/cycle-components';

function slideMakerMaker(sources) {
  return function slideMaker(slides) {
    return slides.map((slide, key) => isolateImplicit(
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
    ));
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
  const requestCfg = {
    category: 'slides',
    headers: {
      'secret-key': '$2a$10$GZwoEk/XNb/kw1YWkBw4ROCKnYp8CVOw/A9D9Yki4TiSufJzbBkmC',
    },
    url: '//jsonbin.io/b/59c943c2bbab4566375b751f', // GET method by default
  };

  return {
    actions: {
      newRequest$: xs.of(requestCfg),
    },
    components: {
      slidePanel$: sources.HTTP
        .select('slides')
        .flatten()
        .map(resp => resp.body.slides)
        .map(slideMakerMaker(sources))
        .map(panelMakerMaker(sources)),
    },
  };
}

function model({ actions, components }) {
  return {
    requests$: actions.newRequest$,
    slidePanelVdom$: components.slidePanel$
      .map(slp => slp.map(sl => sl.DOM))
      .map(slp => xs.combine(...slp))
      .flatten(),
  };
}

function view({ slidePanelVdom$ }) {
  return slidePanelVdom$
    .map(slidePanelVdom => (
      <div>My state is an: {slidePanelVdom}</div>
    ));
}

export default function (sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    HTTP: state.requests$,
    // Scroll: xs.merge(state.scrollDownClick$, state.log$),
    // Log: state.log$,
  };
}
