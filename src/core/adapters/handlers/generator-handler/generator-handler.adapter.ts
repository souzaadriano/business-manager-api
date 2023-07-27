import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { randomUUID } from 'crypto';
import { IGeneratorHandler } from './generator-handler.contract';

export class GeneratorHandler implements IGeneratorHandler {
  uuid(): Uuid {
    return new Uuid(randomUUID());
  }
}
