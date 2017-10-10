// import { fibonacciGen } from './app/redstone/sandie-box/generators';
import { delayValue, printGenArray } from './app/redstone/sandie-box/asyncs';

// pipe(...fns: [...Function]) => x => y
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const trace = label => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};
const g = n => n + 1;
const f = n => n * 2;

const doStuffBetter = pipe(
  g,
  trace('after g'),
  f,
  trace('after f'),
);

export default async function doTheHookyPooky() {
  // const gen = fibonacciGen();
  // let cgv = gen.next();
  // for (let i = 0; i < 20; i += 1) {
  //   console.log(cgv.value);
  //   cgv = gen.next();
  // }
  // console.log(...fibonacciBase(20));
  doStuffBetter(20);
  return delayValue(printGenArray('hookypooky'.split('')), 5000);
}
