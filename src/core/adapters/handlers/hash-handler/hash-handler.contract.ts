import { Hash } from '@/core/domain/class/hash/hash.class';

export interface IHashHandler {
  validate(hash: Hash, value: string): Promise<boolean>;
  generate(value: string): Promise<Hash>;
}
