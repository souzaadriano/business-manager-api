import { ClassConstructor } from '@/helpers/class-constructor.type';
import { IEngine } from './engine.contract';

export class Bootstrap {
  private engines: Set<ClassConstructor<IEngine>>;
  private constructor(engines: ClassConstructor<IEngine>[]) {
    this.engines = new Set(engines);
  }

  public static createApp(engines: ClassConstructor<IEngine>[]) {
    return new Bootstrap(engines);
  }

  public async start(handle?: () => Promise<void>) {
    const engines = Array.from(this.engines);
    for (const Engine of engines) await this.init(Engine);
    if (handle) await handle();
  }

  private async init(Engine: ClassConstructor<IEngine>) {
    const engine = new Engine();
    await engine.init();
    console.log(`[${Engine.name}]: Started`);
  }
}
