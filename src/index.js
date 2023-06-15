import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

import configureStore from "./store";
import Root from "./root";
import { createBrowserRouter } from "react-router-dom";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

//NOTE todas las rutas las redirijo al elemnto <app/>
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

//NOTE se lo pasamos como segundo argumento
const store = configureStore({ auth: !!accessToken }, { router });

//NOTE pongo store lo más alto en mi app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store} router={router} />
  </React.StrictMode>,
);

//NOTE para mi al pasarselo al root lo que conseguimos es pasarselo al RouterProvider y ya no necesitamos pasarle <app/>
