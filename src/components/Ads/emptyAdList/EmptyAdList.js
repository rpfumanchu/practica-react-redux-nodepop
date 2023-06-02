import Button from "../../shared/Button";
import { Link } from "react-router-dom";
import "./EmptyAdList.css";

const EmptyAdList = () => {
  return (
    <div className="empty-ad-list">
      <p>Se el primero en crear uno</p>
      <Button
        className="button-empty-ad-list"
        as={Link}
        variant="primary"
        to="/api/v1/adverts/new">
        Crea un anuncio
      </Button>
    </div>
  );
};

export default EmptyAdList;
