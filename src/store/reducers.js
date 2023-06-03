import { AD_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";

export const defaultState = {
  auth: false,
  ad: [],
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return true;
    case AUTH_LOGOUT:
      return false;

    default:
      return state;
  }
}

export function ad(state = defaultState.ad, action) {
  if (action.type === AD_LOADED) {
    return action.payload;
  }
  return state;
}
