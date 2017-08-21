/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';

export default function AppContainer() {
  const perrito = 'bender';
  const vdom$ = xs.of((
    <div className="master-layout mdl-layout mdl-js-layout">
      <header className="mdl-layout__header mdl-layout__header--transparent">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Header {perrito}</span>
          <div className="mdl-layout-spacer">.</div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Drawer {perrito}</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="page-content">Yolotli</div>
      </main>
    </div>
  ));

  return {
    DOM: vdom$,
  };
}
