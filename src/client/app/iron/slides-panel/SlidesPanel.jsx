/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import SlidePanel from '../../iron/slide-panel';
import BasicSlide from '../../iron/basic-slide';
import { isolateImplicit } from '../../redstone/helpers/cycle-components';

function slideMakerMaker(sources) {
  return function slideMaker(slides) {
    console.log(slides);
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
  const slidesResponse$ = sources.HTTP
    .select('slides')
    .flatten()
    .map(resp => resp.body.slides);

  const slidesRequest$ = xs.of({
    category: 'slides',
    headers: {
      'secret-key': '$2a$10$GZwoEk/XNb/kw1YWkBw4ROCKnYp8CVOw/A9D9Yki4TiSufJzbBkmC',
    },
    url: '//jsonbin.io/b/59c943c2bbab4566375b751f', // GET method by default
  }).debug('on launch');

  slidesResponse$.addListener({
    next: r => console.log(r.map(slideMakerMaker(sources)).map(panelMakerMaker(sources))),
    complete: () => console.log('Completed request'),
  });
  // const panels$ = sources.props
  //   .map(props => props.slides$)
  //   .flatten()
  //   .map(slideMakerMaker(sources))
  //   .map(panelMakerMaker(sources))
  //   .debug('pmm');

  return {
    actions: {
      newRequest$: slidesRequest$,
    },
    vdoms: {},
  };
}

function model({ actions }) {
  const requests$ = actions.newRequest$;
  return {
    requests$,
  };
}

function view(state) {
  console.log(state);
  return xs.of(<div>The slides panel</div>);
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
