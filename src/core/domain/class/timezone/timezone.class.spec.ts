import { InvalidTimezoneException } from './invalid-timezone.exception';
import { Timezone } from './timezone.class';
import { TIMEZONE } from './timezone.enum';

describe('timezone.class', () => {
  it('should be create a timezone', () => {
    const timezone = new Timezone(TIMEZONE.SAO_PAULO);
    expect(timezone.value).toBe(TIMEZONE.SAO_PAULO);
  });

  it('should throw a InvalidTimezoneException because timezone not exists', () => {
    expect(() => new Timezone('')).toThrow(InvalidTimezoneException);
  });
});
