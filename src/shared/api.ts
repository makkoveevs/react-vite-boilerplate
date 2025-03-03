import { AxiosRequestConfig } from "axios";
import { api, TResponse } from "src/shared/apiService";
import { TLoginRequestData, TLoginResponse, TUser } from "./types";

class Api {
  private readonly api = api;

  public async me(config?: AxiosRequestConfig): TResponse<TUser> {
    return this.api.get<TUser>(`/api/v1/auth/me`, {}, config);
  }

  public async logout(config?: AxiosRequestConfig): TResponse<TUser> {
    return this.api.get<TUser>(`/api/v1/auth/logout`, {}, config);
  }

  public async login(
    { username, password }: TLoginRequestData,
    config?: AxiosRequestConfig
  ): TResponse<TLoginResponse> {
    return this.api.post<TLoginResponse, TLoginRequestData>(
      `/api/v1/auth/login`,
      { username, password },
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
