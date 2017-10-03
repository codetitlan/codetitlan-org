// import { fibonacciGen } from './app/redstone/sandie-box/generators';
import { delayValue, printGenArray } from './app/redstone/sandie-box/asyncs';


export default async function doTheHookyPooky() {
  // const gen = fibonacciGen();
  // let cgv = gen.next();
  // for (let i = 0; i < 20; i += 1) {
  //   console.log(cgv.value);
  //   cgv = gen.next();
  // }
  // console.log(...fibonacciBase(20));

  return delayValue(printGenArray('hookypooky'.split('')), 5000);
}
