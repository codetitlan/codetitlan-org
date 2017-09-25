/** @jsx html */
// @flow-
import xs from 'xstream';
import { div } from '@cycle/dom';
import { isolateGenericComponent } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import BasicSlide from '../../iron/basic-slide';
// import SlidePanel from '../../iron/slide-panel';

function buildSlides(slides, sources) {
  return slides.map((item) => {
    console.log('item', item);
    const slide = BasicSlide({
      ...sources,
      props: xs.of({ className: `slide-${item.title}`, contents: item.message }),
    });
    return { vdom$: slide.DOM };
  });
}

function intent(sources) {
  const masterLayout = isolateGenericComponent(
    MasterLayout,
    'master-layout',
    sources,
  );
  const masterLayoutVdom$ = masterLayout.DOM;
  const masterLayoutScroll$ = masterLayout.Scroll;
  const masterLayoutLog$ = masterLayout.Log;

  const slidesResponse$ = sources.HTTP
    .select('slides')
    .flatten()
    .map(res => buildSlides(res.body.slides, sources));

  return {
    actions: {
      slidesResponse$,
      masterLayoutScroll$,
      masterLayoutLog$,
    },
    vdoms: {
      masterLayoutVdom$,
    },
  };
}

function model({ actions, vdoms }) {
  const request$ = xs.of({
    category: 'slides',
    headers: {
      'secret-key': '$2a$10$GZwoEk/XNb/kw1YWkBw4ROCKnYp8CVOw/A9D9Yki4TiSufJzbBkmC',
    },
    url: '//jsonbin.io/b/59b879521da63e05fbc64ffb', // GET method by default
  });
  return {
    ...vdoms,
    request$,
    slide$: actions.slidesResponse$
      .debug(yama => console.log('yama', yama)),
    log$: actions.masterLayoutLog$,
    scroll$: actions.masterLayoutScroll$,
  };
}

function view({ masterLayoutVdom$, slide$ }) {
  return xs.combine(masterLayoutVdom$, slide$)
    .map(([masterLayoutVdom, slides]) => div('.app-container', [
      masterLayoutVdom,
      slides.map(slide => slide.vdom$),
      div('.console-wrap', [...slides]),
    ]));
}

export default function AppContainer(sources) {
  const state = model(intent(sources));
  const vdom$ = view(state);

  return {
    DOM: vdom$,
    Scroll: state.scroll$,
    Log: state.log$,
    HTTP: state.request$,
  };
}
