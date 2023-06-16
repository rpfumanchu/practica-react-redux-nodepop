import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import * as service from "../service/index";
// import * as auth from "../service/auth";
// import * as ads from "../service/ads";

import * as actionCreators from "./actions";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

//DONE middleware para manejar las redirecciones cuando hay fallo
const failureRedirects = (router, redirectsMap) => () => next => action => {
  const result = next(action);

  if (action.error) {
    const redirect = redirectsMap[action.payload.status];
    if (redirect) {
      router.navigate(redirect);
    }
  }
  return result;
};

//NOTE añado devtools
//NOTE uso preloadedState para tener un estado precargado
export default function configureStore(preloadedState, { router }) {
  const middleware = [
    thunk.withExtraArgument({ service, router }),
    failureRedirects(router, { 401: "/login", 404: "/404" }),
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
