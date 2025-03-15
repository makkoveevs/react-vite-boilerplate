import { AxiosRequestConfig } from "axios";
import { api, TResponse } from "src/shared/apiService";
import {
  TLoginRequestData,
  TLoginResponse,
  TRefreshTokenRequestData,
  TUser
} from "./types";

class Api {
  private readonly api = api;

  public async me(config?: AxiosRequestConfig): TResponse<TUser> {
    return this.api.get<TUser>(`/api/auth/me`, {}, config);
  }

  public async logout(config?: AxiosRequestConfig): TResponse<void> {
    return this.api.post<void, null>(`/api/auth/logout`, null, config);
  }

  public async refreshToken(
    { refreshToken }: TRefreshTokenRequestData,
    config?: AxiosRequestConfig
  ): TResponse<TLoginResponse> {
    return this.api.post<TLoginResponse, TRefreshTokenRequestData>(
      `/api/auth/refresh-token`,
      { refreshToken },
      config
    );
  }

  public async login(
    { email, password }: TLoginRequestData,
    config?: AxiosRequestConfig
  ): TResponse<TLoginResponse> {
    this.api.setRefreshTokenMethod(this.refreshToken);
    return this.api.post<TLoginResponse, TLoginRequestData>(
      `/api/auth/login`,
      { email, password },
      config
    );
  }

  // public async postWithFiles(
  //   value: string,
  //   some_value: number,
  //   files: File[],
  //   config?: AxiosRequestConfig
  // ): TResponse<TFilesUploadResponse> {
  //   const body = new FormData();
  //   body.set("data", JSON.stringify({ value, some_value }));
  //   files.forEach((file) => {
  //     body.append("files", file);
  //   });
  //   return this.api.post(
  //     `${SERVER_URL_MANUAL}/api/v1/files/upload/`,
  //     body,
  //     {
  //       ...config,
  //       headers: { "Content-Type": "multipart/form-data" }
  //     }
  //   );
  // }
}

export default new Api();
