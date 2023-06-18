import { areAdsLoaded, areTagsLoaded, getAdId } from "./selectors";
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AD_CREATED_FAILURE,
  AD_CREATED_REQUEST,
  AD_CREATED_SUCCESS,
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
  async (dispatch, _getState, { service, router }) => {
    dispatch(authLoginRequest());
    try {
      await service.auth.login(credentials);
      //NOTE ahora estoy logueado
      dispatch(authLoginSuccess());
      //NOTE Redirigir al nombre de la ruta o a home
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
      //throw error;
    }
  };

//NOTE Desloguearse
export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT,
});

//DONE desloguearse
export const authLogout =
  () =>
  async (dispatch, _getState, { service }) => {
    await service.auth.logout();
    dispatch(authLogoutSuccess());
  };

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
  async (dispatch, getState, { service }) => {
    if (areAdsLoaded(getState())) {
      return;
    }

    dispatch(adsLoadedRequest());
    try {
      const ads = await service.ads.getAds();
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
  async (dispatch, getState, { service }) => {
    if (areTagsLoaded(getState())) {
      return;
    }

    dispatch(tagsLoadedRequest());
    try {
      const tags = await service.ads.getTags();
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

export const adLoadedSuccess = ads => ({
  type: AD_LOADED_SUCCESS,
  payload: ads,
});

export const adLoadedFailure = error => ({
  type: AD_LOADED_FAILURE,
  error: true,
  payload: error,
});

//DONE anuncio por su id
export const adLoad =
  id =>
  async (dispatch, getState, { service }) => {
    const isLoaded = getAdId(id)(getState());
    if (isLoaded) {
      return;
    }
    dispatch(adLoadedRequest());
    try {
      const ad = await service.ads.getAd(id);
      dispatch(adLoadedSuccess(ad));
    } catch (error) {
      dispatch(adLoadedFailure(error));

      //throw error;
    }
  };

//NOTE crear
export const adCreatedRequest = () => ({
  type: AD_CREATED_REQUEST,
});

export const adCreatedSuccess = ads => ({
  type: AD_CREATED_SUCCESS,
  payload: ads,
});

export const adCreatedFailure = error => ({
  type: AD_CREATED_FAILURE,
  error: true,
  payload: error,
});

//DONE Crear anuncio
export const adCreate =
  ad =>
  async (dispatch, _getState, { service, router }) => {
    dispatch(adCreatedRequest());
    try {
      const { id } = await service.ads.getForm(ad);
      const createdAds = await service.ads.getAd(id);
      dispatch(adCreatedSuccess(createdAds));
      router.navigate(`/adverts/${id}`);
      return createdAds;
    } catch (error) {
      dispatch(adCreatedFailure(error));

      //throw error;
    }
  };

export const adDeleteRequest = () => ({
  type: AD_DELETED_REQUEST,
});

export const adDeleteSuccess = id => ({
  type: AD_DELETED_SUCCESS,
  payload: id,
});

export const adDeleteFailure = error => ({
  type: AD_DELETED_FAILURE,
  error: true,
  payload: error,
});

//DONE borrado de anuncio por su id
export const adDelete =
  id =>
  async (dispatch, getState, { service, router }) => {
    // const isLoaded = getAdId(ad)(getState());
    // if (isLoaded) {
    //   return;
    // }
    dispatch(adDeleteRequest());
    try {
      await service.ads.deleteAd(id);
      //const deletedAd = await getAd(id);
      dispatch(adDeleteSuccess(id));
      router.navigate("/adverts");
      //return deletedAd;
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
