export abstract class AbstractUseCase<INPUT, OUTPUT, DEPENDENCIES> {
  constructor(protected readonly _dependencies: DEPENDENCIES) {}
  abstract execute(input: INPUT): Promise<OUTPUT>;
}
