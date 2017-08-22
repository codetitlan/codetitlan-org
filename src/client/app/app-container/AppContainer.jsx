/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';
// import { html } from 'snabbdom-jsx';
import { div } from '@cycle/dom';
import MasterLayout from '../iron/master-layout';

function instantiateComp(component, id, sources, props?) {
  const compProps = xs.of(props || {});
  const compSources = { DOM: sources.DOM, props: compProps };

  return isolate(component, id)(compSources);
}

export default function AppContainer(sources) {
  const masterLayout = instantiateComp(
    MasterLayout,
    'master-layout',
    sources,
  );

  const masterLayoutVdom$ = masterLayout.DOM;

  const vdom$ = masterLayoutVdom$
    .map(masterLayoutVdom => div('.app-container', [
      masterLayoutVdom,
    ]));

  return {
    DOM: vdom$,
  };
}
