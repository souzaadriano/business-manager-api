import { Stopwatch } from './stopwatch.class';

describe('Stopwatch', () => {
  const stopWatch = new Stopwatch('test');

  it('shoud be defined', () => {
    expect(stopWatch).toBeDefined();
  });

  it.todo('stopwatch should be fine');
});
