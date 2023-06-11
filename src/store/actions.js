import { login } from "../components/auth/service";
import {
  ADS_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TOGGLE_MODAL,
  USERINTERFACE_RESET_ERROR,
} from "./types";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLogin = credentials => async dispatch => {
  dispatch(authLoginRequest());
  try {
    await login(credentials);

    //NOTE ahora estoy logueado
    dispatch(authLoginSuccess());
  } catch (error) {
    dispatch(authLoginFailure(error));
    throw error;
  }
};

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const adsLoaded = ads => ({
  type: ADS_LOADED,
  payload: ads,
});

export const userInterfaceResetError = () => ({
  type: USERINTERFACE_RESET_ERROR,
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});
