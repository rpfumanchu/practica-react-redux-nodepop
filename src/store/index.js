import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import * as actionCreators from "./actions";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

//NOTE añado devtools
//NOTE uso preloadedState para tener un estado precargado
export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeEnhancers());
  return store;
}
