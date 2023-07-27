export interface IExceptionHandler<OUTPUT> {
  handle(error: unknown): OUTPUT;
}
