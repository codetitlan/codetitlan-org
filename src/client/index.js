// @flow
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import newLoop from './app';
// import { getRootElement } from './app/helpers/dom-helpers';
import { getRootElement, clearRootElement } from './app/helpers/dom-helpers';

// getRootElement();
const rootElement = getRootElement();

const loop = newLoop('#root');
loop();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(clearRootElement(rootElement));
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const registration = runtime.register();
//     registration.then((dodo) => {
//       console.log('our serviceWorker has been installed', dodo);
//     });
//   });
// }
