import {
  ADS_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  USERINTERFACE_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  ads: [],
  userInterface: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
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

export function userInterface(state = defaultState.userInterface, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };

    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload };

    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: null };

    case USERINTERFACE_RESET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
