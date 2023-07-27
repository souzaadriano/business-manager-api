import { Uuid } from '@/core/domain/class/uuid/uuid.class';

export interface IGeneratorHandler {
  uuid(): Uuid;
}
