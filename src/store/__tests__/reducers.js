import {
  authLoginSuccess,
  authLogoutSuccess,
  setCredentials,
} from "../actions";
import { auth, credentials, defaultState } from "../reducers";

describe("auth", () => {
  test("should manage 'AUTH_LOGIN_SUCCESS', action", () => {
    const state = defaultState.auth;
    const action = authLoginSuccess();
    const newState = auth(state, action);
    expect(newState).toBe(true);
  });

  test("should manage 'AUTH_LOGOUT', action", () => {
    const state = defaultState.auth;
    const action = authLogoutSuccess();
    const newState = auth(state, action);
    expect(newState).toBe(false);
  });

  test("should manage any other action when state is undefined", () => {
    const state = undefined;
    const action = { type: "any" };
    const newState = auth(state, action);
    expect(newState).toBe(defaultState.auth);
  });

  test("should manage any other action when state is not undefined", () => {
    const state = false;
    const action = { type: "any" };
    const newState = auth(state, action);
    expect(newState).toBe(state);
  });
});

describe("credentials reducer", () => {
  test("should handle SET_CREDENTIALS action", () => {
    //NOTE Estado inicial
    const initialState = {
      email: "",
      password: "",
      rememberMe: false,
    };

    //NOTE Acción a enviar
    const action = setCredentials({
      email: "test@example.com",
      password: "password123",
      rememberMe: true,
    });

    //NOTE Estado esperado después de aplicar la acción
    const expectedState = {
      email: "test@example.com",
      password: "password123",
      rememberMe: true,
    };

    //NOTE Aplicar el reducer
    const nextState = credentials(initialState, action);

    //NOTE Verificar que el estado actualizado sea el esperado
    expect(nextState).toEqual(expectedState);
  });

  test("should return initial state when previous state is undefined", () => {
    //NOTE Acción a enviar
    const action = { type: "UNKNOWN_ACTION" };

    //NOTE Estado esperado (el estado inicial)
    const expectedState = {
      email: "",
      password: "",
      rememberMe: false,
    };

    //NOTE Aplicar el reducer sin un estado previo
    const nextState = credentials(undefined, action);

    //NOTE Verificar que el estado actualizado sea el esperado
    expect(nextState).toEqual(expectedState);
  });

  test("should return current state for unknown action", () => {
    //NOTE Estado actual
    const currentState = {
      email: "test@example.com",
      password: "password123",
      rememberMe: true,
    };

    //NOTE Acción a enviar
    const action = { type: "UNKNOWN_ACTION" };

    //NOTE El estado no debe cambiar
    const nextState = credentials(currentState, action);

    //NOTE Verificar que el estado no haya cambiado
    expect(nextState).toEqual(currentState);
  });
});
