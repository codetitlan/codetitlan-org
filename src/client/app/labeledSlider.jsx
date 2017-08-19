/** @jsx html */
// @flow
import { html } from 'snabbdom-jsx';
import { div, span, input } from '@cycle/dom';

function intent(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value);

  return {
    newValue$,
    props$,
  };
}

function model(component) {
  return component.props$
    .map(props => component.newValue$
      .map(val => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        value: val,
        max: props.max,
      }))
      .startWith(props),
    )
    .flatten()
    .remember();
}

function view($state) {
  return $state.map(state => (
    <div className="labeled-slider">
      <span className="label">{`${state.label} ${state.value}${state.unit}`}</span>
      <input className="slider" type="range" min="{state.min}" max="{state.max}" value="{state.value}" />
    </div>
  ));
}

export default function LabeledSlider(sources: { DOM: any, props: any }) {
  const actions = intent(sources);
  const state$ = model(actions);

  const sinks = {
    DOM: view(state$),
    value: state$.map(state => state.value),
  };
  return sinks;
}
