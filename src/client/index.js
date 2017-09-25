// @flow
import App from './app';
import { getRootElement } from './app/redstone/helpers/dom';
import { doTheHookyPooky } from './debuggieman';

// First ... do the hooky pooky !
((async () => doTheHookyPooky())());

// Make a root element
const rootElement = getRootElement();

// Run the app
App(`#${rootElement.id}`)();

// Enable HMR
if (module && module.hot) {
  module.hot.accept();
}
