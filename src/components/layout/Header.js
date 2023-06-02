import classNames from "classnames";
import Button from "../shared/Button";
import "./Header.css";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import { logout } from "../auth/service";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/context";
import Modal from "../shared/modal/Modal";
import { useState } from "react";

const Header = ({ className }) => {
  const { isLogged, onLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleShowModalconfirm = async event => {
    await logout();
    onLogout();
  };

  const handleShowModalCancel = () => {
    setShowModal(false);
  };

  return (
    <header>
      <nav className={classNames("header-navbar", className)}>
        <Link to="/api/v1/adverts/home">
          <h4 className="navbar-h4">NodePop</h4>
        </Link>
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <NavLink className="navbar-list-item" to="/api/v1/adverts/new">
              New
            </NavLink>
            <NavLink className="navbar-list-item" to="/api/v1/adverts">
              Latest Ad
            </NavLink>
            {isLogged ? (
              <Button onClick={handleLogoutClick} variant="primary2">
                Logout
              </Button>
            ) : (
              <Button as={Link} variant="primary" to="/api/auth/login">
                Login
              </Button>
            )}
          </li>
        </ul>
      </nav>
      <div className="title">
        <Icon className="logo" />
        <h1 className="title-h1">Práctica NodePop</h1>
        <Icon className="logo" />
      </div>
      <div>
        {showModal && (
          <Modal
            title="Abandonar sesión"
            message="¿Estas seguro ? "
            onConfirm={handleShowModalconfirm}
            onCancel={handleShowModalCancel}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
