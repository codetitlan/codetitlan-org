/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';
// import { html } from 'snabbdom-jsx';
import { div } from '@cycle/dom';
import MasterLayout from '../iron/master-layout';

function configureComponent(component, id, sources, props?) {
  return isolate(component, id)({ ...sources, props: xs.of(props || {}) });
}

function view(state$) {
  return state$.map(masterLayoutVdom => div('.app-container', [
    masterLayoutVdom,
  ]));
}

export default function AppContainer(sources) {
  const masterLayout = configureComponent(
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
