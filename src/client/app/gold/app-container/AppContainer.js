// @flow-
import xs from 'xstream';
import { div, p } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import SlidesPanel from '../../iron/slides-panel';

const APP_CONFIG = {
  count: 0,
  masterLayout: {
    heading: 'doggie',
  },
  slidesPanel: {
    requestConfig: {
      category: 'slides',
      url: '//jsonbin.io/b/59c943c2bbab4566375b751f',
      headers: {
        'secret-key':
          '$2a$10$GZwoEk/XNb/kw1YWkBw4ROCKnYp8CVOw/A9D9Yki4TiSufJzbBkmC',
      },
    },
  },
};

function intent(sources) {
  const slidesPanel = isolateExplicit(SlidesPanel, 'slidesPanel', sources);
  const masterLayout = isolateExplicit(MasterLayout, 'masterLayout', sources, {
    content: slidesPanel,
  });
  return {
    components: { masterLayout },
    actions: {
      onionState$: sources.onion.state$,
      scrollUpdates$: sources.Scroll.startWith(0),
    },
  };
}

function model({ actions, components }) {
  const { masterLayout } = components;
  const { scrollUpdates$ } = actions;
  const initReducer$ = xs.of(() => APP_CONFIG);
  const addOneReducer$ = xs
    .periodic(1000)
    .mapTo(prev => ({ ...prev, count: prev.count + 1 }));
  const scrollPositionReducer$ = scrollUpdates$.map(val => prev => ({
    ...prev,
    masterLayout: {
      ...prev.masterLayout,
      scrollPosition: val,
    },
  }));

  return {
    masterLayoutVdom$: masterLayout.DOM,
    onionState$: actions.onionState$.map(os => os.count),
    reducers$: xs.merge(initReducer$, addOneReducer$, scrollPositionReducer$),
    request$: masterLayout.HTTP,
    log$: masterLayout.Log,
    scroll$: masterLayout.Scroll,
  };
}

function view({ masterLayoutVdom$, onionState$ }) {
  return xs
    .combine(masterLayoutVdom$, onionState$)
    .map(([masterLayoutVdom, onionState]) =>
      div('.app-container', [
        masterLayoutVdom,
        div('.console-wrap', [
          p('.counterDisplay', [` Onion State: ${onionState}`]),
        ]),
      ]),
    );
}

export default function(sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: state.scroll$,
    Log: state.log$,
    HTTP: state.request$,
    onion: state.reducers$,
  };
}
