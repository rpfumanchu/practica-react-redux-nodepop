export const getIsLogged = state => state.auth;

export const getAllAds = state => state.ads;

export const getAdId = id => state =>
  getAllAds(state).find(ads => ads.id === id);
