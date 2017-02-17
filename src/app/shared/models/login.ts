export class UserLoginModel {
  email: string;
  password: string;
}

export interface UserShortModel {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginModel {
  user: UserShortModel;
  token: string;
}
