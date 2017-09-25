/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

export default function SlidePanel(sources) {
  const click$ = sources.DOM.select('.slide-panel').events('upstream-channel');

  const props$ = sources.props;

  const vdom$ = props$.map((props) => {
    let { className } = props;
    className = className ? `${className} slide-panel` : 'slide-panel';
    return props.content$.map(content => (
      <div className={className}>{content}</div>
    ));
  }).flatten();

  return { DOM: vdom$, click$ };
}
