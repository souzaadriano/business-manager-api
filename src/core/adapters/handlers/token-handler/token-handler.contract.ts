export interface ITokenHandler<PAYLOAD> {
  sign(payload: PAYLOAD): Promise<string>;
  verify(token: string): Promise<boolean>;
  decode(token: string): Promise<PAYLOAD>;
}
