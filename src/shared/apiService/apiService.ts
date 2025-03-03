import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosRequestConfigAdvanced, TApiParams, TResponse } from "./types";
import {
  API_SOURCE,
  DELAY_BETWEEN_RETRY_MS,
  APP_TOKEN_KEY,
  FLAG_IS_TOKEN_UPDATE,
  MAX_RETRY_COUNT,
  TIMEOUT_API,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  IS_REFRESHING_STORAGE_KEY,
  EXPIRED_TOKEN_RESPONSE_STATUS,
  DENY_RESPONSE_STATUS
} from "src/shared/constants";
import { ROUTES } from "../ROUTES";

let axiosSingletoneInstance: ApiService | undefined;
export class ApiService {
  private readonly axios!: AxiosInstance;
  private retryCounter = 0;
  private readonly tokenType = "Bearer";

  constructor() {
    if (typeof axiosSingletoneInstance !== "undefined") {
      return axiosSingletoneInstance;
    }

    this.axios = axios.create({
      validateStatus: (status) => status >= 200 && status < 400,
      baseURL: API_SOURCE,
      timeout: TIMEOUT_API,
      headers: {
        Accept: "application/json",
        Authorization: `${this.tokenType} ${this.getToken()}`
      }
    });

    this.initRequestHeadersInterceptors();
    this.initResponseRefreshAccessTokenProcessInterceptors();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    axiosSingletoneInstance = this;
    return axiosSingletoneInstance;
  }

  private readonly getToken = (): string | undefined => {
    const tkn = localStorage.getItem(APP_TOKEN_KEY);
    return tkn ?? undefined;
  };

  private readonly initRequestHeadersInterceptors = (): void => {
    this.axios?.interceptors.request.use(
      (config) =>
        // config["delayed"] - кастомный ключ, говорящий о том, что данный запрос выполняется повторно
        // в случае наличия такого ключа делаем задержку DELAY_BETWEEN_RETRY_MS перед выполнением
        new Promise((resolve) =>
          setTimeout(
            () => {
              config.headers.set({
                ...config.headers,
                Authorization: `${this.tokenType} ${this.getToken()}`
              });
              resolve(config);
            },
            "delayed" in config && config["delayed"]
              ? DELAY_BETWEEN_RETRY_MS
              : 0
          )
        )
    );
  };

  private readonly initResponseRefreshAccessTokenProcessInterceptors =
    (): void => {
      this.axios?.interceptors.response.use(
        (response) => {
          this.retryCounter = 0;
          localStorage.removeItem(FLAG_IS_TOKEN_UPDATE);
          return response;
        },

        async (error) => {
          //запоминаем исходный запрос, чтобы позже повторить его
          const originalRequest = error.config as AxiosRequestConfigAdvanced;

          const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
          const refreshTokenFlag = localStorage.getItem(
            IS_REFRESHING_STORAGE_KEY
          );

          if (error.response.status === EXPIRED_TOKEN_RESPONSE_STATUS) {
            // 1. вариант
            // если:
            // - код статуса ответа === EXPIRED_TOKEN_RESPONSE_STATUS
            // - нет IS_REFRESHING_STORAGE_KEY в хранилище,

            // значит:
            // - аксес токен протух

            // в этом случае нужно:
            // - установить в хранилище IS_REFRESHING_STORAGE_KEY (это будет признаком выполнения процесса обновления токена)
            // - выполнить запрос на обновление аксес токена
            // - заново выполнить исходный запрос

            // в случае ошибки при обновлении токена:
            // - удалить признак IS_REFRESHING_STORAGE_KEY
            // - удалить рефреш и аксес токен
            if (refreshTokenFlag === null) {
              if (refreshToken === null) {
                //если нет рефреш токена в хранилище, то это сбойная ситуация. нужно идти на страницу авторизации
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                location.replace(ROUTES.root);
                return Promise.reject(new Error("Not find refresh token"));
              }
              try {
                // устанавливаем признак выполнения обновления токена и запускаем запрос на обновление токена
                localStorage.setItem(IS_REFRESHING_STORAGE_KEY, "true");
                // await this.handleRefreshAccessToken();
                //TODO добавить метод обновления токена
                // снимаем признак выполнения обновления токена, обнуляем счётчик попыток и запускаем повторно исходный запрос
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                this.retryCounter = 0;
                return this.axios(originalRequest);
              } catch {
                this.retryCounter = 0;
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
                location.replace(ROUTES.root);
                return Promise.reject(
                  new Error("Error on access token refreshing process")
                );
              }
            }

            // 2. вариант
            //   если:
            //   - статус EXPIRED_TOKEN_RESPONSE_STATUS
            //   - в хранилище есть IS_REFRESHING_STORAGE_KEY

            //   значит:
            //   - в другом запросе идёт процесс обновления аксес токена

            //   в этом случае нужно:
            //   - подождать DELAY_BETWEEN_RETRY_MS миллисекунд
            //   - заново выполнить исходный запрос - в надежде что новый аксес токен будет зацеплен интерцептором
            //   - ВАЖНО - пробуем повторять MAX_RETRY_COUNT раз с интервалом DELAY_BETWEEN_RETRY_MS миллисекунд

            //   если не увенчалось успехом:
            //   - генерировать ошибку для отображения страницы авторизации
            //   - удалить токены из хранилища
            if (refreshTokenFlag !== null) {
              if (this.retryCounter < MAX_RETRY_COUNT) {
                this.retryCounter++;

                originalRequest["delayed"] = true;
                return this.axios(originalRequest);
              } else {
                this.retryCounter = 0;
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
                //TODO отправить на страницу авторизации
                location.replace(ROUTES.root);
                return Promise.reject(new Error("Go to login page"));
              }
            }

            // 3. вариант
            //  если:
            //  - статус EXPIRED_TOKEN_RESPONSE_STATUS
            //  - в хранилище нет ни аксес токена ни рефреш токена ни флага выполнения процесса обновления аксес токена

            //  значит:
            //  - не авторизован вообще

            //  нужно:
            //  - генерировать ошибку для отображения страницы авторизации
            if (
              accessToken === null &&
              refreshToken === null &&
              refreshTokenFlag === null
            ) {
              this.retryCounter = 0;
              localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
              //TODO отправить на страницу авторизации
              location.replace(ROUTES.root);
              return Promise.reject(new Error("Go to login page"));
            }
          }

          if (error.status === DENY_RESPONSE_STATUS) {
            //TODO
          }

          if (error.response.data.detail) {
            return Promise.reject(
              // new Error(error.response.data.detail as string)
              new Error("")
            );
          }
          return Promise.reject(new Error(error as string));
        }
      );
    };

  readonly get = <T, P = TApiParams>(
    path: string,
    params?: P,
    config?: AxiosRequestConfig
  ): TResponse<T> =>
    this.axios.get<T>(
      path,
      Object.assign({}, config, {
        params,
        paramsSerializer: {
          indexes: null
        }
      })
    );

  readonly post = <T, D>(
    path: string,
    data: D,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.post(path, data, config);

  readonly put = <T, D>(
    path: string,
    data: D,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.put(path, data, config);

  readonly delete = <T>(
    path: string,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.delete(path, config);

  readonly patch = <T, D>(
    path: string,
    data: D,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.patch(path, data, config);

  readonly sse = (path: string): EventSource =>
    new EventSource(`${API_SOURCE}${path}`);
}

export const api = new ApiService();
