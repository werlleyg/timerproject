import { IUser, IUserLogin } from '@/dtos/user';
import API from './axios';

export function userLogin({ loginData, callBack }: IUserLogin) {
  API.post('/session', loginData)
    .then((response) => {
      const data = response.data;
      console.log('[show data user]=> ', data);
      callBack(data);
    })
    .catch((error) => {
      console.log('[error]=> ', error);
    });
}
