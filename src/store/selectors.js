export const getIsLogged = state => state.auth;

export const getAllAds = state => (state.ads.areLoaded ? state.ads.data : []);

export const getAllTags = state =>
  state.tags.areLoaded ? state.tags.data : [];

export const getAdFiltering = state => state.filtered;

// export const getAdId = id => state =>
//   getAllAds(state).find(ads => ads.id === id);

export const getAdId = id => state => state.ads.data.find(ad => ad.id === id);

export const getUserInterface = state => state.userInterface;

export const areAdsLoaded = state => state.ads.areLoaded;

export const areTagsLoaded = state => state.tags.areLoaded;
