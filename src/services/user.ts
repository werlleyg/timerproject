import { IUser, IUserCreate, IUserLogin } from '@/dtos/user';
import API from './axios';
import { toast } from 'react-toastify';

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

export function userCreate({ registerData, callBack }: IUserCreate) {
  API.post('/create', registerData)
    .then((response) => {
      const data = response.data;
      console.log('[user create]=> ', data);
      toast.error('Usuário cadastrado com sucesso');
      callBack();
    })
    .catch((error) => {
      console.log('[error]=> ', error);
      toast.error(error.data?.response?.message);
    });
}
