import { randomUUID } from 'crypto';
import { InvalidInputException } from '../../exception/shared/invalid-input.exception';

export class Uuid {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static create(value: string) {
    Uuid.validate(value);
    return new Uuid(value);
  }

  static generate() {
    return new Uuid(randomUUID());
  }

  get value(): string {
    return this._value;
  }

  static validate(value: string): void {
    const [timeHigh, timeLow, version, family, node] = value.split('-');
    if (timeHigh.length !== 8)
      throw new InvalidInputException(`invalid time-high size, must be 8 and got ${timeHigh.length}`, {
        timeHigh,
        value,
      });
    if (timeLow.length !== 4)
      throw new InvalidInputException(`invalid time-low size, must be 4 and got ${timeLow.length}`, { timeLow, value });
    if (version.length !== 4)
      throw new InvalidInputException(`invalid version size, must be 4 and got ${version.length}`, { version, value });
    if (!version.startsWith('4', 0)) throw new InvalidInputException(`invalid uuid version`, { version, value });
    if (family.length !== 4)
      throw new InvalidInputException(`invalid family size, must be 4 and got ${family.length}`, { family, value });
    if (node.length !== 12)
      throw new InvalidInputException(`invalid node size, must be 12 and got ${node.length}`, { node, value });
  }
}
