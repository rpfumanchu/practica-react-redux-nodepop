import {
  adsLoadedFailure,
  adsLoadedSuccess,
  authLogoutSuccess,
} from "../actions";

import { ADS_LOADED_FAILURE, ADS_LOADED_SUCCESS, AUTH_LOGOUT } from "../types";

//NOTE cuando quiera comparar objetos no se puede usr toBe usaremos toEqual
describe("adsLoadedSuccess", () => {
  test("should return a 'ADS_LOADED_SUCCESS' action", () => {
    const ads = "ads";
    const expectedAction = {
      type: ADS_LOADED_SUCCESS,
      payload: ads,
    };
    const action = adsLoadedSuccess(ads);
    expect(action).toEqual(expectedAction);
  });
});

describe("authLogoutSuccess", () => {
  test("should return an 'AUTH_LOGOUT' action", () => {
    const expectedAction = {
      type: AUTH_LOGOUT,
    };
    expect(authLogoutSuccess()).toEqual(expectedAction);
  });
});

describe("adsLoadedFailure", () => {
  test("should return an  'ADS_LOADED_FAILURE' action", () => {
    const error = "error";
    const expectedAction = {
      type: ADS_LOADED_FAILURE,
      error: true,
      payload: error,
    };
    const action = adsLoadedFailure(error);
    expect(action).toEqual(expectedAction);
  });
});
//it();
