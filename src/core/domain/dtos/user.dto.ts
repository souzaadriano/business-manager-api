import { Email } from '../class/email/email.class';
import { Uuid } from '../class/uuid/uuid.class';

export class UserDTO {
  private readonly _id: Uuid;
  private readonly _email: Email;
  readonly name: string;

  constructor(parameters: TUserDTOConstructor) {
    this._id = parameters.id;
    this._email = parameters.email;
    this.name = parameters.name;
  }

  static create(parameters: TUserDTOParameters) {
    return new UserDTO({
      id: Uuid.create(parameters.id),
      email: Email.create(parameters.email),
      name: parameters.name,
    });
  }

  get id() {
    return this._id.value;
  }

  get email() {
    return this._email.value;
  }

  toObject(): TUserDTOParameters {
    return {
      name: this.name,
      id: this.id,
      email: this.email,
    };
  }
}

type TUserDTOConstructor = {
  readonly id: Uuid;
  readonly name: string;
  readonly email: Email;
};

type TUserDTOParameters = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};
