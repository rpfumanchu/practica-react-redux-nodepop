import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import * as auth from "../components/auth/service";
import * as ads from "../components/Ads/service";

import * as actionCreators from "./actions";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

const middleware = [thunk.withExtraArgument({ auth, ads })];

//NOTE añado devtools
//NOTE uso preloadedState para tener un estado precargado
export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
