import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import * as actionCreators from "./actions";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

const middleware = [thunk];

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
