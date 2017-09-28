/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import RsmButton from '../../wood/rsm-button';

function getScrollButton(sources) {
  const scrollBtn = RsmButton({
    ...sources,
    props: xs.of({ text: '+200', className: 'scroll-down-button' }),
  });
  return {
    DOM: scrollBtn.DOM,
    click$: scrollBtn.click$,
  };
}

function intent(sources) {
  const scrollButton = getScrollButton(sources);
  return {
    actions: {
      scrollUpdate$: sources.Scroll.startWith(0),
      newClick$: scrollButton.click$,
      newError$: sources.DOM.events('error'),
    },
    components: {
      scrollButton,
      slidesPanel: sources.props.map(props => props.components.slidesPanel),
    },
  };
}

function model({ actions, components }) {
  const scrollPosition$ = actions.scrollUpdate$;
  const click$ = actions.newClick$;
  const scrollButtonVdom$ = components.scrollButton.DOM;
  return {
    scrollButtonVdom$,
    scrollPosition$,
    slidesPanelVdom$: components.slidesPanel.map(sp => sp.DOM).flatten(),
    upstreamRequests$: components.slidesPanel.map(sp => sp.HTTP).flatten().debug('on upstreamRequests'),
    scrollDownClick$: click$.map(() => scrollPosition$.take(1)).flatten().map(e => e + 200),
    log$: actions.newError$,
  };
}

function view({ scrollPosition$, scrollButtonVdom$, slidesPanelVdom$ }) {
  return xs.combine(scrollPosition$, scrollButtonVdom$, slidesPanelVdom$)
    .map(([scrollPosition, scrollButton, slidesPanel]) => (
      <div className="mainContainer">
        <header>
          <hgroup>
            <h1>Header</h1>
            <h2>SubHeader</h2>
          </hgroup>
        </header>
        <nav>
          <ul>
            <li><a href="/somewhere">Somewhere</a></li>
            <li><a href="/elsewhere">Elsewhere</a></li>
          </ul>
        </nav>
        {slidesPanel}
        <aside>
          <section>aside</section>
        </aside>
        <div className="scroll-display">
          <span>{scrollPosition}</span>
          {scrollButton}
        </div>
      </div>
    ));
}

export default function (sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: xs.merge(state.scrollDownClick$, state.log$),
    Log: state.log$,
    HTTP: state.upstreamRequests$,
  };
}
