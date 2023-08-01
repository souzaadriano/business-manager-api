import { JsonDocument, JsonValue } from '../types/json-document.type';
import { EXCEPTION_CODE } from './exception-code.enum';

export abstract class AbstractException extends Error {
  private _isUpgraded = false;
  protected readonly _details: Map<string, JsonValue> = new Map<string, JsonValue>();
  abstract readonly code: EXCEPTION_CODE;

  constructor(input: string | Error) {
    super(input instanceof Error ? input.message : input);
    if (input instanceof Error) this._upgradeError(input);
  }

  protected _setReason(message: string) {
    this._setDetails('reason', message);
  }

  public getDetails(): JsonDocument {
    const entries = Array.from(this._details.entries());
    return Object.fromEntries(entries);
  }

  isUpgraded(): boolean {
    return this._isUpgraded;
  }

  toObject() {
    return {
      isUpgraded: this.isUpgraded(),
      details: this.getDetails(),
      name: this.name,
      code: this.code,
      message: this.message,
      stack: this.stack ?? 'not found stack',
    };
  }

  toJson() {
    return JSON.stringify(this.toObject());
  }

  protected _setDetails(key: string, value: JsonValue) {
    this._details.set(key, value);
  }

  private _upgradeError(error: Error) {
    this.stack = error.stack;
    this.name = `${error.name}:${this.name}`;
    this._isUpgraded = true;
    if (this.cause) this._setDetails('cause', this.cause as any);
  }
}
