import { of, Observable, timer, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, repeatWhen } from 'rxjs/operators';

export class RepeatingServiceCall<T> {
  readonly observable$: Observable<T>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();
  timerTimeDelay = 60000 // 1 min

  constructor(delay: number) {
    this.observable$ = timer(this.timerTimeDelay, delay)
      .pipe(
        map(() => <T>{}),
        takeUntil(this._stop),
        repeatWhen(() => this._start)
      );
  }

  start(): void {
    this._start.next();
  }

  stop(): void {
    this._stop.next();
  }

}
