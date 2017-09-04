/** @jsx html */
// @flow
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import makeScrollDriver from './gold/drivers/scroll';
import AppContainer from './app-container';
import WcmdlButton from './wood/wcmdl-button';

if (!customElements.get('wcmdl-button')) {
  customElements.define(WcmdlButton.is, WcmdlButton);
}

export function otherMakeDrivers(selector: string) {
  return {
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    Scroll: makeScrollDriver(
      { duration: 400, element: document.getElementsByTagName('body')[0] },
    ),
    log: (msg$: any) => { msg$.addListener({ next: msg => console.log(msg) }); },
  };
}

export default function App(selector: string) {
  // const makeDrivers = () => ({
  //   DOM: restartable(makeDOMDriver('.app'), {pauseSinksWhileReplaying: false}),
  //   HTTP: restartable(makeHTTPDriver())
  // });

  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    Scroll: makeScrollDriver(
      { duration: 400, element: document.getElementsByTagName('body')[0] },
    ),
    log: (msg$) => { msg$.addListener({ next: msg => console.log(msg) }); },
  });

  return () => {
    run(AppContainer, makeDrivers());
  };
}
