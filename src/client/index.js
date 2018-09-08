// @flow
import { runApp } from './app';
import doTheHookyPooky from './debuggieman';
import { getRootElement } from './app/redstone/helpers/dom';

// First and foremost... do the hooky pooky !
(async () => doTheHookyPooky())();

// Run the app
runApp(getRootElement());

// Enable HMR
if (module && module.hot) {
  module.hot.accept(['./app', './debuggieman'], async () => doTheHookyPooky());
}
