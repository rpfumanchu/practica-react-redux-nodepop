import {
  ADS_LOADED_SUCCESS,
  AD_FILTERING_MAX_PRICE,
  AD_FILTERING_MIN_PRICE,
  AD_FILTERING_NAME,
  AD_FILTERING_SALE,
  AD_FILTERING_TAGS,
  //AUTH_LOGIN_FAILURE,
  //AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOADED_SUCCESS,
  TOGGLE_MODAL,
  TOGGLE_RESULT,
  USERINTERFACE_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  ads: {
    areLoaded: false,
    data: [],
  },
  tags: {
    areLoaded: false,
    data: [],
  },
  userInterface: {
    isLoading: false,
    showModal: false,
    searchResults: true,
    error: null,
  },

  query: "",
  querySale: "",
  queryTags: [],
  queryMinPrice: "",
  queryMaxPrice: "",
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

export function tags(state = defaultState.tags, action) {
  if (action.type === TAGS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  return state;
}
export function query(state = defaultState.query, action) {
  if (action.type === AD_FILTERING_NAME) {
    return action.payload; // Actualiza el estado directamente con el nuevo valor
  }
  return state;
}
export function querySale(state = defaultState.querySale, action) {
  if (action.type === AD_FILTERING_SALE) {
    return action.payload; // Actualiza el estado directamente con el nuevo valor
  }
  return state;
}
export function queryTags(state = defaultState.queryTags, action) {
  if (action.type === AD_FILTERING_TAGS) {
    return action.payload; // Actualiza el estado directamente con el nuevo valor
  }
  return state;
}
export function queryMinPrice(state = defaultState.queryMinPrice, action) {
  if (action.type === AD_FILTERING_MIN_PRICE) {
    return action.payload; // Actualiza el estado directamente con el nuevo valor
  }
  return state;
}

export function queryMaxPrice(state = defaultState.queryMaxPrice, action) {
  if (action.type === AD_FILTERING_MAX_PRICE) {
    return action.payload; // Actualiza el estado directamente con el nuevo valor
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

  if (action.type === TOGGLE_MODAL) {
    return { ...state, showModal: !state.showModal };
  }
  if (action.type === TOGGLE_RESULT) {
    return { ...state, searchResults: action.value };
  }

  return state;
}
