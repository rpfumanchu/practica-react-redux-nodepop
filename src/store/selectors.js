export const getIsLogged = state => state.auth;

export const getAllAds = state => state.ads.data;

export const getAdId = id => state =>
  getAllAds(state).find(ads => ads.id === id);

export const getUserInterface = state => state.userInterface;

export const getShowModal = state => state.userInterface.showModal;

export const areAdsLoaded = state => state.ads.areLoaded;
