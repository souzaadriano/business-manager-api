import { Uuid } from '../uuid/uuid.class';

export class Employees {
  private readonly _storeId: Uuid;
  private readonly _employees: Map<string, TEmployee>;

  constructor(storeId: string | Uuid, employees?: TEmployee[]) {
    this._employees = this._populate(employees);
    this._storeId = storeId instanceof Uuid ? storeId : Uuid.create(storeId);
  }

  get storeId(): string {
    return this._storeId.value;
  }

  get(id: string): TEmployee | undefined {
    return this._employees.get(id);
  }

  list(): TEmployee[] {
    return Array.from(this._employees.values());
  }

  add(employee: TEmployee) {
    this._employees.set(employee.id, employee);
  }

  private _populate(employees?: TEmployee[]): Map<string, TEmployee> {
    if (!employees) return new Map<string, TEmployee>();
    return new Map(employees.map((employee) => [employee.id, employee]));
  }
}

export type TEmployee = {
  name: string;
  id: string;
};
