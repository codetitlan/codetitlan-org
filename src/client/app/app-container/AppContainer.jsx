/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';
// import { html } from 'snabbdom-jsx';
import { div } from '@cycle/dom';
import MasterLayout from '../iron/master-layout';

function instantiateComp(component, id, sources, props?) {
  const compProps = xs.of(props || {});
  const compSources = { DOM: sources.DOM, Scroll: sources.Scroll, props: compProps };

  return isolate(component, id)(compSources);
}

function view(state$) {
  return state$.map(masterLayoutVdom => div('.app-container', [
    masterLayoutVdom,
  ]));
}

export default function AppContainer(sources) {
  const masterLayout = instantiateComp(
    MasterLayout,
    'master-layout',
    sources,
  );

  const masterLayoutVdom$ = masterLayout.DOM;

  const vdom$ = view(masterLayoutVdom$);
  const scroll$ = masterLayout.Scroll;

  return {
    DOM: vdom$,
    Scroll: scroll$,
  };
}
