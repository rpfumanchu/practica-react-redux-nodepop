import { Provider } from "react-redux";
import { RouterProvider as Router } from "react-router-dom";

export default function Root({ store, router }) {
  return (
    <Provider store={store}>
      <Router router={router} />
    </Provider>
  );
}

//NOTE para mi ya no necesitamos pasrle children porque el router creado esta haciendo que se renderice todo el elemento <app/>
