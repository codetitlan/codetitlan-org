/** @jsx html */
// @flow
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import makeScrollDriver from './gold/drivers/scroll';
import AppContainer from './app-container';
import WcmdlButton from './wood/wcmdl-button';

if (!customElements.get('wcmdl-button')) {
  customElements.define('wcmdl-button', WcmdlButton);
}

export default function App(selector: string) {
  return () => {
    run(AppContainer, {
      DOM: makeDOMDriver(selector),
      Scroll: makeScrollDriver(
        { duration: 200, element: document.getElementsByTagName('body')[0] },
      ),
      log: (msg$) => { msg$.addListener({ next: msg => console.log(msg) }); },
    });
  };
}
