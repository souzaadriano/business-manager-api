import { Hash } from '@/core/domain/class/hash/hash.class';
import { compare, genSalt, hash } from 'bcrypt';
import { IHashHandler } from './hash-handler.contract';

export class HashHandler implements IHashHandler {
  async validate(hash: Hash, value: string): Promise<boolean> {
    return await compare(value, hash.value);
  }

  async generate(value: string): Promise<Hash> {
    const hashedValue = await hash(value, await genSalt(8));
    return new Hash(hashedValue, this);
  }
}
