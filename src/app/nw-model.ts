import { stringify } from '@angular/core/src/util';

export interface NwComponentStructure {
  componentType: NwComponentType;
  inputData: any;
  name: string;
  componentCreationCount: number;
  children?: Array<NwComponentStructure>;
  data?: Map<string, any>;
}

export enum NwComponentType {
  Default = 'Default',
  OnPush = 'Push'
}

export enum NwChangeDetectionState {
  Default = 'Default',
  OnPush = 'OnPush',
  DefaultDetached = 'Default+Detached',
  OnPushDetached = 'OnPush+Detached'
}

export enum NwLogType {
  LifecycleEvent,
  HtmlEvent,
  Bookmark,
  Other
}

export class NwLogMessage {
  public readonly message: string;
  constructor(
    public readonly type: NwLogType,
    indentation: number,
    message: string
  ) {
    this.message = ' '.repeat(indentation) + message;
  }
}
