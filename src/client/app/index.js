/** @jsx html */
// @flow
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeGunDriver } from 'cycle-gun';
import onionify from 'cycle-onionify';
import makeScrollDriver from './redstone/drivers';
import AppContainer from './gold/app-container';

// import registerCustomElements from './registerCustomElements';
//
// registerCustomElements();

export default function App(selector: string) {
  const scrollTarget = 'html';
  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    Scroll: makeScrollDriver(
      { duration: 400, element: document.getElementsByTagName(scrollTarget)[0] },
    ),
    Log: (msg$) => { msg$.addListener({ next: msg => console.info(msg) }); },
    Gun: makeGunDriver({ root: 'root', peers: ['http://localhost:3210'] }),
  });

  const onionWrap = onionify(AppContainer);

  return () => {
    run(onionWrap, makeDrivers());
  };
}

export function runApp(rootElement: HTMLElement) {
  const appInstance = App(`#${rootElement.id}`);
  appInstance();
}
