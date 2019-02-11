import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NwLogMessage, NwLogType } from '../nw-model';
import { NwLoggerService } from '../services/nw-logger.service';

@Component({
  selector: 'app-nw-logs',
  templateUrl: './nw-logs.component.html',
  styleUrls: ['./nw-logs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NwLogsComponent
  implements OnInit, OnDestroy, AfterViewChecked, DoCheck {
  public readonly logs = new Array<NwLogMessage>();
  private onDestroy = new Subject<void>();
  @ViewChild('logMessages') private logMessagesDiv: ElementRef<HTMLDivElement>;
  NwLogType = NwLogType;

  constructor(
    private logger: NwLoggerService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.cd.detach();
  }

  ngOnInit() {
    this.logger.logged$.pipe(takeUntil(this.onDestroy)).subscribe(
      (logs: Array<NwLogMessage>): void => {
        if (logs.length) {
          this.logs.push(...logs);
          if (this.logs.length > 500) {
            const numberToRemove = this.logs.length - 500;
            this.logs.splice(0, numberToRemove);
          }
          this.logs.push(new NwLogMessage(NwLogType.Bookmark, 0, ''));
          this.cd.detectChanges();
        }
      }
    );
    this.scrollToBottom();
  }

  ngDoCheck(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewChecked() {
    this.zone.runOutsideAngular(() => {
      asyncScheduler.schedule(() => {
        this.scrollToBottom();
      }, 1000);
    });
  }

  clear(): void {
    this.logs.splice(0, this.logs.length);
    this.cd.detectChanges();
  }

  scrollToBottom(): void {
    if (this.logMessagesDiv) {
      const div = this.logMessagesDiv.nativeElement;
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
    }
  }
}
