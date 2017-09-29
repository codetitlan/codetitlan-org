/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';
// import { article } from '@cycle/dom';

export default function SlidePanel(sources) {
  const upstreamClick$ = sources.DOM
    .select('.slidePanel')
    .events('upstream-channel');

  const props$ = sources.props;

  const vdom$ = props$.map((props) => {
    const { className, content$ } = props;
    const classString = className ? `${className} slidePanel` : 'slidePanel';
    return content$.map(content => (
      <article className={classString}>{content}</article>
    ));
  }).flatten();

  return { DOM: vdom$, upstream$: upstreamClick$ };
}
