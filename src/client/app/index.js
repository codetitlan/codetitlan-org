/** @jsx html */
// @flow
import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import LabeledSlider from './labeledSlider';

export default function newLoop(selector: string) {
  return () => {
    run(LabeledSlider, {
      props: () => xs.of({
        label: 'Weights', unit: 'kg', min: 45, value: 70, max: 140,
      }),
      DOM: makeDOMDriver(selector),
    });
  };
}
