import { getAds } from "../components/Ads/service";
import { login } from "../components/auth/service";
import { areAdsLoaded } from "./selectors";
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
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

export const adsLoadedRequest = () => ({
  type: ADS_LOADED_REQUEST,
});

export const adsLoadedSuccess = ads => ({
  type: ADS_LOADED_SUCCESS,
  payload: ads,
});

export const adsLoadedFailure = error => ({
  type: ADS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const adsLoaded = () => async (dispatch, getState) => {
  if (areAdsLoaded(getState())) {
    return;
  }

  dispatch(adsLoadedRequest());
  try {
    const ads = await getAds();
    dispatch(adsLoadedSuccess(ads));
  } catch (error) {
    dispatch(adsLoadedFailure(error));
    throw error;
  }
};

export const userInterfaceResetError = () => ({
  type: USERINTERFACE_RESET_ERROR,
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});
