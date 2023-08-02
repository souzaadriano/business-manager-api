import { BearerToken } from '@/core/domain/class/token/bearer-token.class';

export interface ITokenHandler<PAYLOAD> {
  sign(payload: PAYLOAD): Promise<BearerToken>;
  verify(token: BearerToken): Promise<boolean>;
  decode(token: BearerToken): Promise<PAYLOAD>;
}
