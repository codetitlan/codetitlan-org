// @flow
/* global document */
import componentHandler from 'material-design-lite/material';
import WcmdlButton from './app/wood/wcmdl-button';

if (!customElements.get('wcmdl-button')) {
  customElements.define('wcmdl-button', WcmdlButton);
}

const h = (document => ({
  dce: element => document && document.createElement(element),
}))(document);

export const buttonsMarkup = () => `
  <h4>DO NOT PRESS IT</h4>
  <div class="button-wrapper">
    <wcmdl-button name="BRB" class="big-red-button" colored raised accent fab>BIG RED BUTTON</wcmdl-button>
  </div>
  `;

const setEventListener = (elem: HTMLElement) => {
  elem.addEventListener('wcmdl-button-clicked', (evt) => {
    const target = evt.target;
    if (target instanceof WcmdlButton) {
      const { name } = target;

      // Do something with the button click
      console.log('wcmdl-button event catched', name);
    }
  });
};

export const renderApp = (elem: HTMLElement, something: any) => {
  elem.innerHTML = something;   // eslint-disable-line no-param-reassign
  const allTheButtons = document.querySelectorAll('wcmdl-button');
  Array.from(allTheButtons).forEach(button => setEventListener(button));
  componentHandler.upgradeDom();
};

export const insertDelayedButton = (elem: HTMLElement, timeout?: number = 1500) => {
  const buttonWrapper = h.dce('div');
  const delayedButton = h.dce('wcmdl-button');

  buttonWrapper.classList.add('button-wrapper');
  buttonWrapper.appendChild(delayedButton);

  delayedButton.innerText = 'BIG ORANGE BUTTON';
  delayedButton.setAttribute('name', 'BRB-delayed');

  ['primary', 'raised', 'ripple']
    .forEach(prop => delayedButton.setAttribute(prop, ''));

  setEventListener(delayedButton);

  setTimeout(() => {
    elem.appendChild(buttonWrapper);
  }, timeout);
};
