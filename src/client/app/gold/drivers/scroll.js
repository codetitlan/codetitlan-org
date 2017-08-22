// @flow

// export default function makeScrollDriver(options: {duration: number, element: HTMLElement}) {
//   return function ScrollDriver(sink$): Subject<string> {
//     const source = new Subject();
//
//     const scrollTo = (element, to, duration = 600) => {
//       if (duration <= 0) return;
//       const difference = to - element.scrollTop;
//       const perTick = (difference / duration) * 10;
//       setTimeout(() => {
//         element.scrollTop += perTick;
//         if (element.scrollTop === to) return;
//         scrollTo(element, to, duration - 10);
//       });
//     };
//
//     window.addEventListener('scroll', () => {
//       source.next(`${window.scrollY}px`);
//     });
//
//     Observable.from(sink$)
//       .subscribe(
//         (offsetTop: number) => {
//           scrollTo(options.element, offsetTop, options.duration);
//         },
//       );
//     return source;
//   };
// }
