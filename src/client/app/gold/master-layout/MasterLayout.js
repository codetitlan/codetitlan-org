// @flow-
import xs from 'xstream';
import RsmButton from '../../wood/rsm-button';
import getMarkup from './getMarkup';

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
  sources.onion.state$.addListener({
    next: os => console.log('onion state !', os),
  });
  const scrollButton = getScrollButton(sources);
  return {
    actions: {
      scrollUpdate$: sources.Scroll.startWith(0),
      newClick$: scrollButton.click$,
      newError$: sources.DOM.events('error'),
    },
    components: {
      scrollButton,
      mainContent: sources.props.map(props => props.components.mainContent),
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
    slidesPanelVdom$: components.mainContent.map(sp => sp.DOM).flatten(),
    upstreamRequests$: components.mainContent.map(sp => sp.HTTP).flatten(),
    scrollDownClick$: click$.map(() => scrollPosition$.take(1)).flatten().map(e => e + 200),
    log$: actions.newError$,
  };
}

function view({ scrollPosition$, scrollButtonVdom$, slidesPanelVdom$ }) {
  return xs.combine(scrollPosition$, scrollButtonVdom$, slidesPanelVdom$)
    .map(getMarkup);
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
