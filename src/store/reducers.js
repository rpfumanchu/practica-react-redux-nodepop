import {
  ADS_LOADED_SUCCESS,
  AD_DELETED_SUCCESS,
  AD_FILTERING_MAX_PRICE,
  AD_FILTERING_MIN_PRICE,
  AD_FILTERING_NAME,
  AD_FILTERING_SALE,
  AD_FILTERING_TAGS,
  AD_LOADED_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  SHOW_MODAL_DELETE,
  TAGS_LOADED_SUCCESS,
  TOGGLE_MODAL,
  TOGGLE_MODAL_DELETE,
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
    showModalDelete: true,
    showDeleteMessage: null,
    searchResults: true,
    error: null,
  },
  filtered: {
    query: "",
    querySale: "",
    queryTags: [],
    queryMinPrice: "",
    queryMaxPrice: "",
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
  if (action.type === AD_LOADED_SUCCESS) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === AD_DELETED_SUCCESS) {
    return { ...state, areLoaded: false };
  }

  return state;
}

export function tags(state = defaultState.tags, action) {
  if (action.type === TAGS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  return state;
}

export function filtered(state = defaultState.filtered, action) {
  switch (action.type) {
    case AD_FILTERING_NAME:
      return {
        ...state,
        query: action.payload,
      };
    case AD_FILTERING_SALE:
      return {
        ...state,
        querySale: action.payload,
      };
    case AD_FILTERING_TAGS:
      return {
        ...state,
        queryTags: action.payload,
      };
    case AD_FILTERING_MIN_PRICE:
      return {
        ...state,
        queryMinPrice: action.payload,
      };
    case AD_FILTERING_MAX_PRICE:
      return {
        ...state,
        queryMaxPrice: action.payload,
      };
    default:
      return state;
  }
}

export function userInterface(state = defaultState.userInterface, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    return { ...state, isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { ...state, isLoading: false, showModalDelete: true, error: null };
  }

  if (action.type === USERINTERFACE_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type === TOGGLE_MODAL) {
    return { ...state, showModal: !state.showModal };
  }
  if (action.type === TOGGLE_MODAL_DELETE) {
    return { ...state, showModalDelete: !state.showModalDelete };
  }
  if (action.type === SHOW_MODAL_DELETE) {
    return { ...state, showDeleteMessage: action.value };
  }
  if (action.type === TOGGLE_RESULT) {
    return { ...state, searchResults: action.value };
  }

  return state;
}
