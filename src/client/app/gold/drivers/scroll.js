// @flow
import xs from 'xstream';
import { adapt } from '@cycle/run/lib/adapt';

export default function makeScrollDriver(options: {duration: number, element: HTMLElement}) {
  return function ScrollDriver(sink$: {addListener: (listener: {})=> void}) {
    const scrollTo = (element, to, duration = 600) => {
      if (duration <= 0) return;
      const difference = to - element.scrollTop;
      const perTick = (difference / duration) * 10;
      setTimeout(() => {
        element.scrollTop += perTick; // eslint-disable-line
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
      });
    };

    const listener = {
      next: (offsetTop: number) => {
        scrollTo(options.element, offsetTop, options.duration);
      },
    };

    sink$.addListener(listener);

    const producer = {
      start(_listener) {
        this.eventHandler = () => _listener.next(Number(window.scrollY));
        window.addEventListener('scroll', this.eventHandler);
      },
      stop() {
        window.removeEventListener('scroll', this.eventHandler);
      },
    };

    return adapt(xs.create(producer));
  };
}
