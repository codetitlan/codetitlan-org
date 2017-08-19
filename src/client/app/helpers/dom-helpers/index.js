// @flow

export function clearRootElement(rootElement: HTMLElement) {
  return () => {
    if (!document.body) throw new Error('Unexpectedly missing a <body> tag');
    document.body.removeChild(rootElement);
  };
}

export function getRootElement() {
  const rootElement = document.createElement('div');
  rootElement.setAttribute('id', 'root');

  if (!document.body) throw new Error('Unexpectedly missing a <body> tag');
  document.body.innerHTML = ''; //eslint-disable-line
  return document.body.appendChild(rootElement);
}
