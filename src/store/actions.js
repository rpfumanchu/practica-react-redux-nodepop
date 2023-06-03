import { AD_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";

export const authLogin = () => ({
  type: AUTH_LOGIN,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const adLoaded = ad => ({
  type: AD_LOADED,
  payload: ad,
});
