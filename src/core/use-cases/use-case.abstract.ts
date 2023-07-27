export abstract class AbstractUseCase<INPUT, OUTPUT, DEPENDENCIES = any> {
  constructor(protected readonly _dependencies: DEPENDENCIES) {}
  abstract execute(input: INPUT): Promise<OUTPUT>;
}
