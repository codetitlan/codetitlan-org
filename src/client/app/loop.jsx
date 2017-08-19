/** @jsx html */
// @flow
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';

function renderWeightSlider(weight) {
  return (
    <div>
      {`Weight ${weight}kg`}
      <input className="weight" type="range" min="40" max="140" value={weight} />
    </div>
  );
}

function renderHeightSlider(height) {
  return (
    <div>
      {`Height ${height}cm`}
      <input className="height" type="range" min="140" max="210" value={height} />
    </div>
  );
}

function calcBmi(weight, height) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

function view(state$) {
  return state$.map(({ weight, height, bmi }) => (
    <div>
      <h2>{`BMI is ${bmi}`}</h2>
      {renderWeightSlider(weight)}
      {renderHeightSlider(height)}
    </div>
  ));
}

function model(actions) {
  const weight$ = actions.changeWeight$.startWith(70);
  const height$ = actions.changeHeight$.startWith(170);

  return xs.combine(weight$, height$)
    .map(([weight, height]) => ({ weight, height, bmi: calcBmi(weight, height) }));
}

function intent(domSource) {
  return {
    changeWeight$: domSource.select('.weight').events('input')
      .map(ev => ev.target.value),
    changeHeight$: domSource.select('.height').events('input')
      .map(ev => ev.target.value),
  };
}

function main(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}

export default function newLoop(selector: string) {
  return () => {
    run(main, {
      DOM: makeDOMDriver(selector),
    });
  };
}
