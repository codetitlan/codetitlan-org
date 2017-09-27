/** @jsx html */
// @flow
import { html } from 'snabbdom-jsx';

export default function BasicSlide(sources: { DOM: any, props: any }) {
  const props$ = sources.props;
  const vdom$ = props$.map(props => (
    <div className="basic-slide">{props.contents}</div>
  ));

  return {
    DOM: vdom$,
  };
}
