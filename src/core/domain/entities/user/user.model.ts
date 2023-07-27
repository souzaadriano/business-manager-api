import { Email } from '../../class/email/email.class';
import { Hash } from '../../class/hash/hash.class';
import { Uuid } from '../../class/uuid/uuid.class';

export class UserModel {
  private readonly _uuid: Uuid;
  private readonly _email: Email;
  readonly name: string;
  readonly hash: Hash;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(parameters: TUserModelParameters) {
    this._uuid = parameters.uuid;
    this._email = parameters.email;
    this.name = parameters.name;
    this.hash = parameters.hash;
    this.createdAt = parameters.createdAt;
    this.updatedAt = parameters.updatedAt;
    this.deletedAt = parameters.deletedAt;
  }

  public static create(parameters: TCreateUserModel): UserModel {
    const now = new Date();

    return new UserModel({
      uuid: parameters.id,
      name: parameters.name,
      email: Email.create(parameters.email),
      hash: parameters.hash,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  public get isActive(): boolean {
    return this.deletedAt ? true : false;
  }

  public get email(): string {
    return this._email.value;
  }

  public get id(): string {
    return this._uuid.value;
  }
}

type TCreateUserModel = {
  id: Uuid;
  name: string;
  email: string;
  hash: Hash;
};

type TUserModelParameters = {
  uuid: Uuid;
  name: string;
  email: Email;
  hash: Hash;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
