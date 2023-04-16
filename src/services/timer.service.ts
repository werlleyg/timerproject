import { IActivity } from '@/dtos/timer';
import API from './axios';

export function getActivityList(callBack: (a?: any) => void) {
  API.get('/tasks')
    .then((response) => {
      const data: IActivity[] = response.data;
      console.log('[get activity list]=> ', data);
      callBack(data);
    })
    .catch((error) => {
      console.log('[get activity list error]=> ', error);
    });
}
