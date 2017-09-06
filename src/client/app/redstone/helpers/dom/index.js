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

export function browserDetection() {
  return {
    // Firefox 1.0+
    isFirefox: window.InstallTrigger && typeof window.InstallTrigger !== 'undefined',
    // Edge 20+
    isEdge: !(document.documentMode) && !!window.StyleMedia,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
  };
}
