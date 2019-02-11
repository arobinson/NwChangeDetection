import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectorRef,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import {
  NwComponentStructure,
  NwComponentType,
  NwLogMessage,
  NwLogType
} from '../nw-model';
import { NwLoggerService } from '../services/nw-logger.service';
import { NwStatisticsService } from '../services/nw-statistics.service';

export class NwBaseComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    OnDestroy {
  @Input() componentStructure: NwComponentStructure;
  @HostBinding('attr.data-depth') @Input() depth: number;
  name: string;
  @Input() parentName: string;
  NwComponentType = NwComponentType;
  creationCount: number;
  checkedCount = 0;
  changeCount = 0;
  contentCheckedCount = 0;
  detached: boolean;

  @ViewChild('markForCheckOutsideAngular') markForCheckOutsideAngular: ElementRef<HTMLButtonElement>;
  @ViewChild('detectChangesOutsideAngular') detectChangesOutsideAngular: ElementRef<HTMLButtonElement>;

  private markForCheckListener: (event: MouseEvent) => void;
  private detectChangesListener: (event: MouseEvent) => void;

  constructor(
    public stats: NwStatisticsService,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
    private logService: NwLoggerService
  ) {
  }

  get mouseArea(): boolean {
    return this.getData('mouseArea') === true;
  }

  set mouseArea(value: boolean) {
    if (value !== this.mouseArea) {
      this.setData('mouseArea', value);
    }
  }

  ngOnInit() {
    this.creationCount = ++this.componentStructure.componentCreationCount;
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        this.depth,
        `${this.name} ngOnInit. Creation count: ${this.creationCount}`
      )
    );
    this.detached = this.getData('detached') === true;
    if (this.detached) {
      this.cd.detach();
    }
  }
  ngAfterViewChecked(): void {
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        this.depth,
        `${this.name} ngAfterViewChecked`
      )
    );
  }

  ngOnDestroy(): void {
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        this.depth,
        `${this.name} ngOnDestroy`
      )
    );
    this.markForCheckOutsideAngular.nativeElement.removeEventListener(
      'click',
      this.markForCheckListener
    );
    this.detectChangesOutsideAngular.nativeElement.removeEventListener(
      'click',
      this.detectChangesListener
    );
  }

  ngAfterContentInit(): void {
    this.zone.runOutsideAngular(() => {
      this.markForCheckListener = (_event: MouseEvent): void => {
        this.cd.markForCheck();
      };
      this.markForCheckOutsideAngular.nativeElement.addEventListener(
        'click',
        this.markForCheckListener
      );
      this.detectChangesListener = (_event: MouseEvent): void => {
        this.cd.detectChanges();
      };
      this.detectChangesOutsideAngular.nativeElement.addEventListener(
        'click',
        this.detectChangesListener
      );
    });
  }

  ngAfterContentChecked(): void {
    this.contentCheckedCount++;
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        this.depth,
        `${this.name} ngAfterContentChecked`
      )
    );
  }

  ngDoCheck(): void {
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        this.depth,
        `${this.name} ngDoCheck`
      )
    );
    this.checkedCount++;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.name) {
      this.name = this.parentName
        ? `${this.parentName}.${this.componentStructure.name}`
        : this.componentStructure.name;
      this.logService.logMessage(
        new NwLogMessage(
          NwLogType.LifecycleEvent,
          this.depth,
          `${this.name} ngOnChanges`
        )
      );
    }
    this.changeCount++;
  }

  markForCheck(): void {
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.HtmlEvent,
        this.depth,
        `${this.name} markForCheck called`
      )
    );
    this.cd.markForCheck();
  }

  toggleMouseMoveArea(): void {
    this.mouseArea = !this.mouseArea;
  }

  onMouseMove(_event: MouseEvent): void {
    // Don't do anything
  }

  detectChanges(): void {
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.HtmlEvent,
        this.depth,
        `${this.name} detectChanges called`
      )
    );
    this.cd.detectChanges();
  }

  detach(): void {
    if (!this.detached) {
      this.logService.logMessage(
        new NwLogMessage(
          NwLogType.HtmlEvent,
          this.depth,
          `${this.name} detached`
        )
      );
      this.detached = true;
      this.setData('detached', true);
      this.cd.detach();
    }
  }

  reattach(): void {
    if (this.detached) {
      this.logService.logMessage(
        new NwLogMessage(
          NwLogType.HtmlEvent,
          this.depth,
          `${this.name} reattached`
        )
      );
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
}
