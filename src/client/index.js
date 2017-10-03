// @flow
import { runApp } from './app';
import doTheHookyPooky from './debuggieman';
import { getRootElement } from './app/redstone/helpers/dom';

// First ... do the hooky pooky !
((async () => doTheHookyPooky())());

// Make a root element
const rootElement = getRootElement();

// Run the app
runApp(rootElement);

// Enable HMR
if (module && module.hot) {
  module.hot.accept('./app');
}
