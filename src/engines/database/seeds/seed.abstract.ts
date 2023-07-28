import { GeneratorHandlerFactory } from '@/factories/adapters';
import { DeleteAccessor } from '../accessors/delete.accessor';

export abstract class AbstractSeed {
  protected readonly _date = new Date('2023-07-27');
  protected readonly _deletedAt = new Date('2023-07-28');
  protected readonly _generatorHandler = GeneratorHandlerFactory.instance();
  protected readonly _deleteAccessor = new DeleteAccessor();

  abstract up(): Promise<void>;
  abstract down(): Promise<void>;
}
