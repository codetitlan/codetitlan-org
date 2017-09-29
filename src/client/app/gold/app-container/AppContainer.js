// @flow-
import { div } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import SlidesPanel from '../../iron/slides-panel';

function intent(sources) {
  const mainContent = SlidesPanel(sources);

  const masterLayout = isolateExplicit(
    MasterLayout,
    'master-layout',
    sources,
    { heading: 'Foobar', components: { mainContent } },
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
