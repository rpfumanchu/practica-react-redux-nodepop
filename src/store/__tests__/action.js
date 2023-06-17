import {
  adsLoadedFailure,
  adsLoadedRequest,
  adsLoadedSuccess,
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess,
} from "../actions";

import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AUTH_LOGOUT,
} from "../types";

//NOTE cuando quiera comparar objetos no se puede usr toBe usaremos toEqual
describe("adsLoadedSuccess", () => {
  test("should create an action to request ads loaded", () => {
    const expectedAction = {
      type: ADS_LOADED_REQUEST,
    };

    expect(adsLoadedRequest()).toEqual(expectedAction);
  });

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

describe("authLogin", () => {
  const credentials = "credentials";
  const redirectUrl = "redirectUrl";
  const action = authLogin(credentials);
  //NOTE jest.fn es una función que no va hacer nada pero es una función
  const dispatch = jest.fn();
  const service = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from: { pathname: redirectUrl } } } },
  };

  test("when login api resolves should follow the login flow", async () => {
    //NOTE con mockResolvedValue() va a resolver con una promesa
    service.auth.login = jest.fn().mockResolvedValue();

    //NOTE el getState no lo necesito pero lo paso como undefined
    await action(dispatch, undefined, { service, router });

    //NOTE la primera vez que llamo a dispatch con el argumento authLoginRequest
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());

    expect(service.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl);
  });

  test("when login api rejects should follow error flow", async () => {
    const error = new Error("failed");

    //NOTE con mockRejectedValue sera una promesa que va a devolver un rejectected
    service.auth.login = jest.fn().mockRejectedValue(error);

    //NOTE en este caso puedo no pasar el router
    await action(dispatch, undefined, { service });

    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
  });
});

describe("authLogout", () => {
  test("should dispatch authLogoutSuccess after logging out", async () => {
    const dispatch = jest.fn();
    const service = {
      auth: {
        logout: jest.fn().mockResolvedValue(),
      },
    };

    await authLogout()(dispatch, undefined, { service });

    expect(dispatch).toHaveBeenCalledWith(authLogoutSuccess());
    expect(service.auth.logout).toHaveBeenCalledTimes(1);
  });
});
