export interface IActivity {
  id: number;
  name: string;
  time: string;
  status: IStatus;
}

export interface IPropsStatus {
  status?: IStatus;
}

export type IStatus = 'pending' | 'active' | 'completed';
