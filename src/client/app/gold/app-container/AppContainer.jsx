/** @jsx html */
// @flow-
// import xs from 'xstream';
import { div } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
// import SlidePanel from '../../iron/slide-panel';

function intent(sources) {
  // const slides$ = sources.HTTP
  //   .select('slides')
  //   .flatten()
  //   .map(resp => resp.body.slides)
  //   .debug('on intent');

  const masterLayout = isolateExplicit(
    MasterLayout,
    'master-layout',
    sources,
    { heading: 'Foobar' },
  );
  const masterLayoutVdom$ = masterLayout.DOM;
  const masterLayoutScroll$ = masterLayout.Scroll;
  const masterLayoutLog$ = masterLayout.Log;

  return {
    actions: {
      masterLayoutScroll$,
      masterLayoutLog$,
    },
    vdoms: {
      masterLayoutVdom$,
    },
  };
}

function model({ actions, vdoms }) {
  // const request$ = xs.of({
  //   category: 'slides',
  //   headers: {
  //     'secret-key': '$2a$10$GZwoEk/XNb/kw1YWkBw4ROCKnYp8CVOw/A9D9Yki4TiSufJzbBkmC',
  //   },
  //   url: '//jsonbin.io/b/59c943c2bbab4566375b751f', // GET method by default
  // });
  return {
    ...vdoms,
    // request$,
    log$: actions.masterLayoutLog$,
    scroll$: actions.masterLayoutScroll$,
  };
}

function view({ masterLayoutVdom$ }) {
  return masterLayoutVdom$
    .map(masterLayoutVdom => div('.app-container', [
      masterLayoutVdom,
      div('.console-wrap', ['yolo']),
    ]));
}

export default function (sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: state.scroll$,
    Log: state.log$,
    // HTTP: state.request$,
  };
}
