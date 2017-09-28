/** @jsx html */
// @flow-
// import xs from 'xstream';
import { div } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import SlidesPanel from '../../iron/slides-panel';
// import SlidePanel from '../../iron/slide-panel';

function intent(sources) {
  const slidesPanel = SlidesPanel(sources);

  const masterLayout = isolateExplicit(
    MasterLayout,
    'master-layout',
    sources,
    { heading: 'Foobar', components: { slidesPanel } },
  );

  const masterLayoutVdom$ = masterLayout.DOM;
  const masterLayoutScroll$ = masterLayout.Scroll;
  const masterLayoutLog$ = masterLayout.Log;
  const masterLayoutRequests$ = masterLayout.HTTP;

  return {
    actions: {
      masterLayoutScroll$,
      masterLayoutLog$,
      masterLayoutRequests$,
    },
    vdoms: {
      masterLayoutVdom$,
    },
  };
}

function model({ actions, vdoms }) {
  return {
    ...vdoms,
    request$: actions.masterLayoutRequests$,
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
    HTTP: state.request$,
  };
}
