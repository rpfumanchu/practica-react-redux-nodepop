import classNames from "classnames";
import { ReactComponent as Icon } from "../../assets/nodepop.svg";
import "./Footer.css";

const Footer = ({ className }) => {
  return (
    <div className={classNames("footer", className)}>
      <p className="p">NodePop®. Todos los derechos reservados 2023</p>
      <Icon className="logo-footer" />
    </div>
  );
};

export default Footer;
