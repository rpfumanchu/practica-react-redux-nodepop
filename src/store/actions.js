import { getAds, getTags } from "../components/Ads/service";
import { login } from "../components/auth/service";
//import { queryMaxPrice, queryMinPrice, querySale, queryTags } from "./reducers";
import { areAdsLoaded, areTagsLoaded } from "./selectors";
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AD_FILTERING_MAX_PRICE,
  AD_FILTERING_MIN_PRICE,
  AD_FILTERING_NAME,
  AD_FILTERING_SALE,
  AD_FILTERING_TAGS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  TOGGLE_MODAL,
  TOGGLE_RESULT,
  USERINTERFACE_RESET_ERROR,
} from "./types";

//NOTE manejo el login
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

//DONE manejo el login
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

//NOTE Desloguearse
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

//NOTE manejo de la carga de anuncios
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

//DONE Carga de anuncios
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

//NOTE manejo los tags
export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedSuccess = tags => ({
  type: TAGS_LOADED_SUCCESS,
  payload: tags,
});

export const tagsLoadedFailure = error => ({
  type: TAGS_LOADED_FAILURE,
  error: true,
  payload: error,
});

//DONE accedo a los distintos tags
export const tagsLoaded = () => async (dispatch, getState) => {
  if (areTagsLoaded(getState())) {
    return;
  }

  dispatch(tagsLoadedRequest());
  try {
    const tags = await getTags();
    dispatch(tagsLoadedSuccess(tags));
  } catch (error) {
    dispatch(tagsLoadedFailure(error));
    throw error;
  }
};

export const userInterfaceResetError = () => ({
  type: USERINTERFACE_RESET_ERROR,
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const toggleResult = value => ({
  type: TOGGLE_RESULT,
  value,
});

//NOTE para filtrar por los distintos campos
export const adFilteringName = value => ({
  type: AD_FILTERING_NAME,
  payload: value,
});

export const adFilteringSale = value => ({
  type: AD_FILTERING_SALE,
  payload: value,
});

export const adFilteringTags = value => ({
  type: AD_FILTERING_TAGS,
  payload: value,
});

export const adFilteringMinPrice = value => ({
  type: AD_FILTERING_MIN_PRICE,
  payload: value,
});

export const adFilteringMaxPrice = value => ({
  type: AD_FILTERING_MAX_PRICE,
  payload: value,
});
