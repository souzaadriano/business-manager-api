export class UserTokenDto {
  readonly sessionId: string;
  readonly userId: string;

  constructor(sessionId: string, userId: string) {
    this.sessionId = sessionId;
    this.userId = userId;
  }
}
