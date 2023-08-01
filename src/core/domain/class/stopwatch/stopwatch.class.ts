import { Timestamp } from '../date-time/timestamp.class';

export class Stopwatch {
  private readonly _steps: TStopwatchMark[] = [];

  constructor(private readonly _context: string) {}

  public start(): void {
    if (this._steps.length !== 0) throw new Error();
    this._steps.push({ label: 'start', timestamp: +new Date(), spend: 0 });
  }

  public get startedAt(): Timestamp {
    return new Timestamp(this._steps[0].timestamp);
  }

  public step(label: string): number {
    const timestamp = +new Date();
    const spend = this._getSpendedTime(timestamp);
    this._steps.push({ label, timestamp, spend });
    return spend;
  }

  public stop(): void {
    const timestamp = +new Date();
    const spend = this._getSpendedTime(timestamp);
    this._steps.push({ label: 'end', timestamp, spend });
  }

  getResult(): TStopwatchResult {
    const steps = this._getStopwatchSteps();
    const firstStep = this._getFirstBreak();
    const total = this._total();

    return {
      context: this._context,
      startedAt: firstStep.timestamp,
      elapsedTime: total,
      steps,
    };
  }

  public getContext() {
    return this._context;
  }

  private _getStopwatchSteps(): TStopwatchStep[] {
    const { steps } = this._steps.reduce(
      (result, step) => {
        if (!result.lastStep) {
          result.lastStep = step.label;
          return result;
        }

        result.steps.push({
          from: result.lastStep,
          to: step.label,
          time: step.spend,
        });

        result.lastStep = step.label;
        return result;
      },
      { steps: [], lastStep: undefined } as { steps: TStopwatchStep[]; lastStep?: string },
    );

    return steps;
  }

  private _total() {
    const first = this._getFirstBreak();
    const last = this._getLastBreak();
    return last.timestamp - first.timestamp;
  }

  private _getSpendedTime(timestamp: number) {
    const lastBreak = this._getLastBreak();
    return timestamp - lastBreak.timestamp;
  }

  private _getLastBreak() {
    return this._steps[this._steps.length - 1];
  }

  private _getFirstBreak() {
    return this._steps[0];
  }
}

type TStopwatchMark = {
  label: string;
  timestamp: number;
  spend: number;
};

type TStopwatchStep = {
  from: string;
  to: string;
  time: number;
};

type TStopwatchResult = {
  context: string;
  startedAt: number;
  steps: TStopwatchStep[];
  elapsedTime: number;
};
