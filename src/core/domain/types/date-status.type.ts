import { DateTime } from '../class/date-time/date-time.class';

export type TDateStatus = {
  readonly createdAt: DateTime;
  readonly updatedAt: DateTime;
  readonly deletedAt: DateTime | null;
};
