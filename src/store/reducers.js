import {
  ADS_LOADED_SUCCESS,
  //AUTH_LOGIN_FAILURE,
  //AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TOGGLE_MODAL,
  USERINTERFACE_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  ads: {
    areLoaded: false,
    data: [],
  },
  userInterface: {
    isLoading: false,
    showModal: false,
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
  if (action.type === ADS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  return state;
}

export function userInterface(state = defaultState.userInterface, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    return { ...state, isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { ...state, isLoading: false, error: null };
  }

  if (action.type === USERINTERFACE_RESET_ERROR) {
    return { ...state, error: null };
  }
  // if (action.type === AUTH_LOGOUT) {
  //   return { ...state, showModal: false };
  // }
  if (action.type === TOGGLE_MODAL) {
    return { ...state, showModal: !state.showModal };
  }

  return state;
}
