import { sleep } from '@/utils/test/sleep.util';
import { describe, expect, it } from 'vitest';
import { Stopwatch } from './stopwatch.class';

describe('Stopwatch', () => {
  const stopWatch = new Stopwatch('test');

  it('stopwatch should be fine', async () => {
    stopWatch.start();
    await sleep(500);
    stopWatch.step('step1');
    await sleep(500);
    stopWatch.step('step2');
    await sleep(1000);
    stopWatch.step('step3');
    await sleep(300);
    stopWatch.stop();
    const result = stopWatch.getResult();
    console.debug(result);

    expect(result).toEqual({
      context: 'test',
      startedAt: 1688063359518,
      elapsedTime: 2312,
      steps: [
        { from: 'start', to: 'step1', time: 503 },
        { from: 'step1', to: 'step2', time: 502 },
        { from: 'step2', to: 'step3', time: 1006 },
        { from: 'step3', to: 'end', time: 301 },
      ],
    });
  });
});
