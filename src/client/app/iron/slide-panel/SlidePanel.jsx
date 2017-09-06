/** @jsx html */
// @flow-
// import { html } from 'snabbdom-jsx';

export default function SlidePanel(sources) {
  const click$ = sources.DOM.select('.slide').events('click');

  const props$ = sources.props;

  // const vdom$ = props$.map(props => (
  //   <div className="slide">{typeof props}</div>
  // ));
  const vdom$ = props$.map(props => props.content$).flatten().debug(e => console.log(e));

  return { DOM: vdom$, click$ };
}
