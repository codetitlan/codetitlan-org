// @flow
import xs from 'xstream';
import { adapt } from '@cycle/run/lib/adapt';

export default function makeScrollDriver(options: {duration: number, element: HTMLElement}) {
  return function ScrollDriver(sink$: any) {
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

    const sinkListener = {
      next: (offsetTop: number) => {
        scrollTo(options.element, offsetTop, options.duration);
      },
    };

    const producer = xs.create({
      start(listener) {
        this.subscriptor = () => listener.next(`${window.scrollY}px`);
        window.addEventListener('scroll', this.subscriptor);
      },
      stop() {
        window.removeEventListener('scroll', this.subscriptor);
      },
    });

    sink$.addListener(sinkListener);
    return adapt(producer);
  };
}
