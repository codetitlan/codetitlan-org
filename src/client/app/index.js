/** @jsx html */
// @flow
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import makeScrollDriver from './iron/drivers/scroll';
import AppContainer from './gold/app-container';
import registerCustomElements from './registerCustomElements';

registerCustomElements();

export default function App(selector: string) {
  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    Scroll: makeScrollDriver(
      { duration: 400, element: document.getElementsByTagName('body')[0] },
    ),
    // log: (msg$) => { msg$.addListener({ next: msg => console.log(msg) }); },
  });

  return () => {
    run(AppContainer, makeDrivers());
  };
}
