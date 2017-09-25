function* genFromArray(anArray) {
  for (let i = 0; i < anArray.length; i += 1) {
    yield anArray[i];
  }
}

function printGenArray(someArray = [1, 2, 3, 4, 5, 6]) {
  const gen = genFromArray(someArray);
  let item = gen.next();
  if (typeof item.done === 'boolean') {
    while (!item.done) {
      console.log(item.value);
      item = gen.next();
    }
  }
}

export async function delayValue(value, delay = 0) {
  return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

export async function doTheHookyPooky() {
  const hookyPooky = 'hookypooky'.split('');
  return new Promise(resolve => setTimeout(() => resolve(printGenArray(hookyPooky)), 3000));
}
