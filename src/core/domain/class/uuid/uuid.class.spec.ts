import { InvalidInputException } from '../../exception/shared/invalid-input.exception';
import { Uuid } from './uuid.class';

describe('uuid.class', () => {
  it('should be a valid uuid-v4', () => {
    const uuid = new Uuid('2642cc3b-b46c-4602-b63e-e86d7cba917c');
    expect(uuid.value).toBe('2642cc3b-b46c-4602-b63e-e86d7cba917c');
  });

  it('should be throw an error because is a invalid uuid', () => {
    expect(() => Uuid.create('')).toThrow(InvalidInputException);
  });

  it('should be throw an error because is a invalid uuid version', () => {
    expect(() => Uuid.create('2642cc3b-b46c-3602-b63e-e86d7cba917c')).toThrow(InvalidInputException);
  });
});
