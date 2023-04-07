import { IActivity } from './timer';

export interface IDialog {
  showDialog: boolean;
  activity?: IActivity;
  pressCancel: () => void;
  pressAccept: (activity: IActivity) => void;
}

export interface IPropsDialog {
  showDialog: boolean;
}

export interface INewActivityDialog {
  showDialog: boolean;
  activity?: IActivity;
  pressCancel: () => void;
  pressAccept: (activity: INewActivity) => void;
}

export interface INewActivity {
  name?: string;
  time?: string;
}
