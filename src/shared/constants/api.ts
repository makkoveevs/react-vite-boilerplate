export const API_SOURCE =
  location.protocol +
  "//" +
  location.hostname +
  (location.port ? ":" + location.port : "");

export const TIMEOUT_API = 60 * 1000;

export const APP_TOKEN_KEY = "accessToken";
