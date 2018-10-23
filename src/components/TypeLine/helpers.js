/**
 * Apply a closure to all the elements of an array after a randomized
 * delay within a range
 * @param { [x => () => f(x)] } iter - Iterator
 * @param { Number } min - Minimum range time in ms
 * @param { Number } max - Maximum range time in ms
 */
export const randomlyTimedForEach = (effect, min = 0, max = 0) => iter =>
  [...iter]
    .map(c => () => effect(c))
    .reduce(
      (acc, itm) =>
        acc.then(
          () =>
            new Promise(resolve =>
              setTimeout(
                () => resolve(itm()),
                Math.floor(Math.random() * (max - min + 1)) + min
              )
            )
        ),
      Promise.resolve()
    );
