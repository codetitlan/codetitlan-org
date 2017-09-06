/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';

export default function isolateGenericComponent(component, id = null, sources, props?) {
  return isolate(component, id)({ ...sources, props: xs.of(props || {}) });
}
