/** @jsx html */
// @flow-
import { div } from '@cycle/dom';
import { isolateGenericComponent } from '../../iron/helpers/cycle-components';
import MasterLayout from '../master-layout';

function view(state$) {
  return state$.map(masterLayoutVdom => div('.app-container', [
    masterLayoutVdom,
  ]));
}

export default function AppContainer(sources) {
  const masterLayout = isolateGenericComponent(
    MasterLayout,
    'master-layout',
    sources,
  );

  const masterLayoutVdom$ = masterLayout.DOM;

  const vdom$ = view(masterLayoutVdom$);
  const scroll$ = masterLayout.Scroll;
  const log$ = masterLayout.log;

  return {
    DOM: vdom$,
    Scroll: scroll$,
    log: log$,
  };
}
