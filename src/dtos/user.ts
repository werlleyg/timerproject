export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILoginData {
  email?: string;
  password?: string;
}

export interface IRegisterData {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

// services

export interface IUserLogin {
  loginData?: ILoginData;
  callBack: (a?: any) => void;
}
