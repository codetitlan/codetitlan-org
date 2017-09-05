// @flow
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './app';
// import { getRootElement } from './app/redstone/helpers/dom-helpers';
import { getRootElement, clearRootElement } from './app/redstone/helpers/dom';

const rootElement = getRootElement();

const loop = App(`#${rootElement.id}`);
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
