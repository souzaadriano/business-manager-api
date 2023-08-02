export class BearerToken {
  private static readonly _prefix = 'Bearer';
  readonly value: string;

  constructor(token: string) {
    this.value = token;
  }

  get token(): string {
    return `${BearerToken._prefix} ${this.value}`;
  }

  get prefix(): string {
    return BearerToken._prefix;
  }

  static create(token: string) {
    const [prefix, value] = token.split(' ');
    BearerToken._validatePrefix(prefix);
    return new BearerToken(value);
  }

  private static _validatePrefix(prefix?: string) {
    if (!prefix) throw new Error('');
    if (prefix.toLowerCase() !== BearerToken._prefix.toLowerCase()) throw new Error();
  }
}
