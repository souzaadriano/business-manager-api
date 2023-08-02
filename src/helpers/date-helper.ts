import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';

export abstract class DateHelper {
  static registerController(dateHandler: IDateHandler, inactive?: boolean) {
    const createdAt = dateHandler.toDateTime(new Date());
    const updatedAt = createdAt.clone();
    const deletedAt = inactive ? null : createdAt.clone();

    return { createdAt, updatedAt, deletedAt };
  }
}
