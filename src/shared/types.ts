export type TUser = {
  id: string;
  username: string;
  fio: string;
  email: string;
  isAdmin: boolean;
};

export type TLoginRequestData = { username: string; password: string };
export type TLoginResponse = { access_token: string; refresh_token: string };
