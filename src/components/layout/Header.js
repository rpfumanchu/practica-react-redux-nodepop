import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Button from "../shared/Button";
import "./Header.css";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import { logout } from "../auth/service";
import { Link, NavLink } from "react-router-dom";
import Modal from "../shared/modal/Modal";
import { authLogout, toggleModal } from "../../store/actions";
import { getIsLogged, getUserInterface } from "../../store/selectors";

const Header = ({ className }) => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const { showModal } = useSelector(getUserInterface);

  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = () => {
    dispatch(toggleModal());
  };

  const handleShowModalconfirm = async event => {
    await logout();
    onLogout();
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  return (
    <header>
      <nav className={classNames("header-navbar", className)}>
        <Link to="/adverts/home">
          <h4 className="navbar-h4">NodePop</h4>
        </Link>
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <NavLink className="navbar-list-item" to="/adverts/new">
              New
            </NavLink>
            <NavLink className="navbar-list-item" to="/adverts">
              Latest Ad
            </NavLink>
            {isLogged ? (
              <Button onClick={handleLogoutClick} variant="primary2">
                Logout
              </Button>
            ) : (
              <Button as={Link} variant="primary" to="/login">
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
