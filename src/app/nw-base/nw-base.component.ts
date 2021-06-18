import { AfterContentChecked, AfterContentInit, AfterViewChecked, ChangeDetectorRef, DoCheck, ElementRef, HostBinding, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, AfterViewInit, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NwComponentStructure, NwComponentType, NwLogMessage, NwLogType } from '../nw-model';
import { NwLoggerService } from '../services/nw-logger.service';
import { NwStatisticsService } from '../services/nw-statistics.service';

@Directive()
export class NwBaseComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy, AfterViewInit {
  @Input() componentStructure: NwComponentStructure;
  @Input() globalClickCount = 0;
  @HostBinding('attr.data-depth') @Input() depth: number;
  name: string;
  @Input() parentName: string;
  NwComponentType = NwComponentType;
  creationCount: number;
  checkedCount = 0;
  changeCount = 0;
  contentCheckedCount = 0;
  timesButtonClicked = 0;
  detached: boolean;

  @ViewChild('markForCheckOutsideAngular', { static: true }) markForCheckOutsideAngular: ElementRef<HTMLButtonElement>;
  @ViewChild('detectChangesOutsideAngular', { static: true }) detectChangesOutsideAngular: ElementRef<HTMLButtonElement>;

  private onDestroy = new Subject<void>();
  private markForCheckListener: (event: MouseEvent) => void;
  private detectChangesListener: (event: MouseEvent) => void;

  constructor(
    public stats: NwStatisticsService,
    protected cd: ChangeDetectorRef,
    protected er: ElementRef,
    protected zone: NgZone,
    private logService: NwLoggerService
  ) {
    this.stats.statisticsReset$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.checkedCount = 0;
      this.changeCount = 0;
      this.contentCheckedCount = 0;
      this.creationCount = 0;
      this.timesButtonClicked = 0;
      this.onNeedsUpdate();
    });
  }

  get mouseArea(): boolean {
    this.logService.logMessage(new NwLogMessage(NwLogType.Other, this.depth, `${this.name} mouseArea evaluated`));
    return this.getData('mouseArea') === true;
  }

  set mouseArea(value: boolean) {
    if (value !== this.mouseArea) {
      this.setData('mouseArea', value);
    }
  }

  onNeedsUpdate(): void {
    if (this.detached) {
      this.cd.detectChanges();
    }
  }

  ngOnInit() {
    this.creationCount = ++this.componentStructure.componentCreationCount;
    this.logService.logMessage(
      new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngOnInit. Creation count: ${this.creationCount}`)
    );
    this.detached = this.getData('detached') === true;
    if (this.detached) {
      this.cd.detach();
    }
  }
  ngAfterViewInit(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngAfterViewInit`));
  }

  ngAfterViewChecked(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngAfterViewChecked`));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();

    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngOnDestroy`));
    this.markForCheckOutsideAngular.nativeElement.removeEventListener('click', this.markForCheckListener);
    this.detectChangesOutsideAngular.nativeElement.removeEventListener('click', this.detectChangesListener);
  }

  ngAfterContentInit(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngAfterContentInit`));
    this.setupNonAngularListeners();
  }

  ngAfterContentChecked(): void {
    this.contentCheckedCount++;
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngAfterContentChecked`));
  }

  ngDoCheck(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngDoCheck`));
    this.checkedCount++;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.name) {
      this.name = this.parentName ? `${this.parentName}.${this.componentStructure.name}` : this.componentStructure.name;
    }
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} ngOnChanges`));
    this.changeCount++;
  }

  onButtonClick(): void {
    this.timesButtonClicked++;
    this.logService.logMessage(new NwLogMessage(NwLogType.LifecycleEvent, this.depth, `${this.name} button clicked`));
  }

  markForCheck(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.HtmlEvent, this.depth, `${this.name} markForCheck called`));
    this.cd.markForCheck();
  }

  toggleMouseMoveArea(): void {
    this.mouseArea = !this.mouseArea;
  }

  onMouseMove(_event: MouseEvent): void {
    // Don't do anything
  }

  detectChanges(): void {
    this.logService.logMessage(new NwLogMessage(NwLogType.HtmlEvent, this.depth, `${this.name} detectChanges called`));
    this.cd.detectChanges();
  }

  detach(): void {
    if (!this.detached) {
      this.logService.logMessage(new NwLogMessage(NwLogType.HtmlEvent, this.depth, `${this.name} detached`));
      this.detached = true;
      this.setData('detached', true);
      this.cd.detach();
      this.cd.detectChanges();
    }
  }

  reattach(): void {
    if (this.detached) {
      this.logService.logMessage(new NwLogMessage(NwLogType.HtmlEvent, this.depth, `${this.name} reattached`));
      this.detached = false;
      this.setData('detached', false);
      this.cd.reattach();
    }
  }

  getData(key: string): any {
    const data = this.componentStructure.data;
    return data ? data.get(key) : undefined;
  }

  setData(key: string, value: any): any {
    if (!this.componentStructure.data) {
      this.componentStructure.data = new Map();
    }
    const oldValue = this.componentStructure.data.get(key);
    this.componentStructure.data.set(key, value);
    return oldValue;
  }

  private setupNonAngularListeners() {
    this.zone.runOutsideAngular(() => {
      this.markForCheckListener = (_event: MouseEvent): void => {
        this.onButtonClick();
        console.log(`${this.name}: markForCheck being called outside of Angular. Click count now: ${this.timesButtonClicked}`);
        this.cd.markForCheck();
      };
      this.markForCheckOutsideAngular.nativeElement.addEventListener('click', this.markForCheckListener);
      this.detectChangesListener = (_event: MouseEvent): void => {
        this.onButtonClick();
        console.log(`${this.name}: detectChanges being called outside of Angular. Click count now: ${this.timesButtonClicked}`);
        this.cd.detectChanges();
      };
      this.detectChangesOutsideAngular.nativeElement.addEventListener('click', this.detectChangesListener);
    });
  }
}
