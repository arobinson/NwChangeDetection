export interface NwComponentStructure {
  componentType: NwComponentType;
  inputData: any;
  name: string;
  children?: Array<NwComponentStructure>;
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
