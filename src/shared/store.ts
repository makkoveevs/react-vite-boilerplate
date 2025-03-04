import { makeAutoObservable } from "mobx";
import api from "./api";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from "./constants";
import { TLoginRequestData, TUser } from "./types";

class Store {
  public isAuth: boolean = false;
  public user: TUser | null = null;
  private api: typeof api = api;

  constructor() {
    makeAutoObservable(this, {});
  }

  public setIsAuth = (data: boolean): void => {
    this.isAuth = data;
  };

  public setIsUser = (data: TUser | null): void => {
    this.user = data;
  };

  public login = (data: TLoginRequestData): Promise<void> =>
    this.api.login(data).then(async (response) => {
      const data = response.data;
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);

      this.user = await this.me();
      this.setIsAuth(true);
    });

  public logout = (): Promise<void> =>
    this.api.logout().then(() => {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      this.setIsAuth(false);
      this.user = null;
    });

  public me = (refetch: boolean = true): Promise<TUser> => {
    if (this.user && !refetch) {
      return Promise.resolve(this.user);
    }
    return this.api.me().then((response) => {
      this.setIsUser(response.data);
      return response.data;
    });
  };
}

export default new Store();
