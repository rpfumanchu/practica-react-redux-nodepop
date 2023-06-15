import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/Button";
//import { login } from "./service";
import "./LoginPage.css";
import Layout from "../layout/Layout";
//import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../shared/modal/ErrorModal";
import Spinner from "../shared/spinner/Spinner";
import {
  authLogin,
  toggleModal,
  userInterfaceResetError,
} from "../../store/actions";
import { getUserInterface } from "../../store/selectors";

//DONE Loguear con email y password y un checkbox para dar la opción de persistir el token, además manejar errores y feedback al usuario. Al hacer Login quiero enviar al usuario a la página a la que queria ir.

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, showModal, error } = useSelector(getUserInterface);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const resetError = () => {
    dispatch(userInterfaceResetError());
  };

  //const onLogin = () => dispatch(authLoginSuccess());

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setCredentials(prevCredentials => ({
        ...prevCredentials,
        [name]: checked,
      }));
    } else {
      setCredentials(prevCredentials => ({
        ...prevCredentials,
        [name]: value,
      }));
    }
  };

  const handleShowModal = () => {
    dispatch(toggleModal());
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authLogin(credentials));

    dispatch(toggleModal());
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <Layout title="Login Page">
      <div>
        {isLoading ? (
          <Spinner message="cargando..." />
        ) : (
          <form onSubmit={handleSubmit} className="container-form">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="text"
              name="email"
              onChange={handleChange}
              value={credentials.email}
              required
            />
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              required
            />
            <label>
              Guardar sesiòn
              <input
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
              />
            </label>
            <Button
              type="submit"
              variant="primary"
              width="button-form"
              disabled={buttonDisabled}>
              Log in
            </Button>
          </form>
        )}

        {showModal && (
          <ErrorModal
            title="Login"
            message={"Acabas de iniciar sesión"}
            onCancel={handleShowModal}
          />
        )}

        {error && (
          <ErrorModal
            title="Error"
            message={error.message}
            onCancel={resetError}
          />
        )}
      </div>
    </Layout>
  );
}

export default LoginPage;
