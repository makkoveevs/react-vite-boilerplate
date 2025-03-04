export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
};

export type TLoginRequestData = { email: string; password: string };
export type TLoginResponse = { accessToken: string; refreshToken: string };
