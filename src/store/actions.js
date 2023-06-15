import { areAdsLoaded, areTagsLoaded, getAdId } from "./selectors";
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AD_DELETED_FAILURE,
  AD_DELETED_REQUEST,
  AD_DELETED_SUCCESS,
  AD_FILTERING_MAX_PRICE,
  AD_FILTERING_MIN_PRICE,
  AD_FILTERING_NAME,
  AD_FILTERING_SALE,
  AD_FILTERING_TAGS,
  AD_LOADED_FAILURE,
  AD_LOADED_REQUEST,
  AD_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  TOGGLE_MODAL,
  TOGGLE_MODAL_DELETE,
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
export const authLogin =
  credentials =>
  async (dispatch, _getState, { auth }) => {
    dispatch(authLoginRequest());
    try {
      await auth.login(credentials);

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
export const adsLoaded =
  () =>
  async (dispatch, getState, { ads: adsService }) => {
    if (areAdsLoaded(getState())) {
      return;
    }

    dispatch(adsLoadedRequest());
    try {
      const ads = await adsService.getAds();
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
export const tagsLoaded =
  () =>
  async (dispatch, getState, { ads: adsService }) => {
    if (areTagsLoaded(getState())) {
      return;
    }

    dispatch(tagsLoadedRequest());
    try {
      const tags = await adsService.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
      throw error;
    }
  };

//NOTE manejo de un anuncio
export const adLoadedRequest = () => ({
  type: AD_LOADED_REQUEST,
});

export const adLoadedSuccess = ad => ({
  type: AD_LOADED_SUCCESS,
  payload: ad,
});

export const adLoadedFailure = error => ({
  type: AD_LOADED_FAILURE,
  error: true,
  payload: error,
});

//DONE anuncio por su id
export const adLoad =
  id =>
  async (dispatch, getState, { ads: adsService }) => {
    const isLoaded = getAdId(id)(getState());
    if (isLoaded) {
      return;
    }
    dispatch(adLoadedRequest());
    try {
      const ad = await adsService.getAd(id);
      dispatch(adLoadedSuccess(ad));
    } catch (error) {
      dispatch(adLoadedFailure(error));
      throw error;
    }
  };

export const adDeleteRequest = () => ({
  type: AD_DELETED_REQUEST,
});

export const adDeleteSuccess = ad => ({
  type: AD_DELETED_SUCCESS,
  payload: ad,
});

export const adDeleteFailure = error => ({
  type: AD_DELETED_FAILURE,
  error: true,
  payload: error,
});

//DONE borrado de anuncio por su id
export const adDelete =
  ad =>
  async (dispatch, getState, { ads: adsService }) => {
    // const isLoaded = getAdId(id)(getState());
    // if (isLoaded) {
    //   return;
    // }
    dispatch(adDeleteRequest());
    try {
      const deletedAd = await adsService.deleteAd(ad);
      //const deletedAd = await getAd(id);
      dispatch(adDeleteSuccess(deletedAd));
      //return deleteAd;
    } catch (error) {
      dispatch(adDeleteFailure(error));
      throw error;
    }
  };

export const userInterfaceResetError = value => ({
  type: USERINTERFACE_RESET_ERROR,
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const toggleModalDelete = () => ({
  type: TOGGLE_MODAL_DELETE,
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
