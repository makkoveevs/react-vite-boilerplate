import { makeAutoObservable } from "mobx";
import { TLoginRequestData, TUser } from "./types";
import api from "./api";

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
    //TODO
    this.api
      .login(data)
      .then(() => void 0)
      .finally(() => {
        this.user = {
          id: "qwoirejlsdlfk",
          fio: "Тест Тестович",
          username: data.username,
          email: data.password,
          isAdmin: Math.random() > 0.5
        };
        this.setIsAuth(true);
      });

  public logout = (): Promise<void> =>
    //TODO
    this.api
      .logout()
      .then(() => void 0)
      .finally(() => {
        this.setIsAuth(false);
        this.user = null;
      });
}

export default new Store();
