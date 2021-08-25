function RandomAlphanumericGenerator(seed: number, length: number) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const generator = pseudoIntRandom(seed, 0, possible.length);
  return {
    next() {
      const charArr = Array.from({ length }, () => possible[generator.next().value]);
      return charArr.join('');
    },
  };
}

function* pseudoIntRandom(seed: number, min: number, max: number): Generator<number, number, unknown> {
  let value = seed;
  while (true) {
    value = (value * 16807) % 2147483647;
    yield min + (value % (max - min));
  }
}

export function IDGenerator(prefix: string, length: number, seed?: number) {
  const defaultSeed = 377;
  const generator = RandomAlphanumericGenerator(seed ?? defaultSeed, length);
  return {
    next() {
      return `${prefix}:_${generator.next()}`;
    },
  };
}
