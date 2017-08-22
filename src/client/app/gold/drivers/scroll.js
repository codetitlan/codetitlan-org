// @flow
import xs from 'xstream';

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

    sink$.addListener({
      next: (offsetTop: number) => {
        scrollTo(options.element, offsetTop, options.duration);
      },
    });

    return xs.create({
      start(listener) {
        window.addEventListener('scroll', () => listener.next(`${window.scrollY}px`));
      },
      stop() {
        window.removeEventListener('scroll');
      },
    });
  };
}
