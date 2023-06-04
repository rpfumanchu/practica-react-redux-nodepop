import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";

export const defaultState = {
  auth: false,
  ads: [],
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

export function ads(state = defaultState.ads, action) {
  if (action.type === ADS_LOADED) {
    return action.payload;
  }
  return state;
}
