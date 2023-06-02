import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";

//NOTE Para mi la propiedad children hace menciòn al elemento que esta dentro del tag

//DONE Funcion que uso para recubrir un componente si es requerido tener autorizaciòn, le paso un objeto location a traves de la propiedad state para saber de que ruta vengo

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
