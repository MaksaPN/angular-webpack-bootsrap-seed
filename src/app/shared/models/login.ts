export class UserLoginModel {
  email: string;
  password: string;
}

export class UserShortModel {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export class LoginModel {
  user: UserShortModel;
  token: string;
}
