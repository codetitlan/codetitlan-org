// @flow-
import xs from 'xstream';
import { div, p } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import SlidesPanel from '../../iron/slides-panel';

function intent(sources) {
  const masterLayout = isolateExplicit(
    MasterLayout,
    'masterLayout',
    sources,
    {
      heading: 'Foobar',
      components: { mainContent: SlidesPanel(sources) },
    },
  );
  return {
    components: { masterLayout },
    actions: {
      onionState$: sources.onion.state$,
    },
  };
}

function model({ actions, components }) {
  const { masterLayout } = components;
  const initReducer$ = xs.of(() => ({ count: 0, masterLayout: { heading: 'doggie' } }));
  const addOneReducer$ = xs.periodic(1000)
    .mapTo(previous => ({ ...previous, count: previous.count + 1 }));

  return {
    masterLayoutVdom$: masterLayout.DOM,
    onionState$: actions.onionState$.map(os => os.count),
    reducers$: xs.merge(initReducer$, addOneReducer$),
    request$: masterLayout.HTTP,
    log$: masterLayout.Log,
    scroll$: masterLayout.Scroll,
  };
}

function view({ masterLayoutVdom$, onionState$ }) {
  return xs.combine(masterLayoutVdom$, onionState$)
    .map(([masterLayoutVdom, onionState]) =>
      div('.app-container', [
        masterLayoutVdom,
        div('.console-wrap', [
          p('.counterDisplay', [` Onion State: ${onionState}`]),
        ]),
      ]));
}

export default function (sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: state.scroll$,
    Log: state.log$,
    HTTP: state.request$,
    onion: state.reducers$,
  };
}
