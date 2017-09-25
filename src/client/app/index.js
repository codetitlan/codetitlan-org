/** @jsx html */
// @flow
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { browserDetection } from './redstone/helpers/dom';
import makeScrollDriver from './redstone/drivers';
import AppContainer from './gold/app-container';

// import registerCustomElements from './registerCustomElements';
//
// registerCustomElements();

export default function App(selector: string) {
  const scrollTarget = browserDetection().isFirefox ? 'html' : 'body';
  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    Scroll: makeScrollDriver(
      { duration: 400, element: document.getElementsByTagName(scrollTarget)[0] },
    ),
    Log: (msg$) => { msg$.addListener({ next: msg => console.info(msg) }); },
  });

  return () => {
    run(AppContainer, makeDrivers());
  };
}
