import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAd, deleteAd } from "../service";
import Layout from "../../layout/Layout";
import "../adsPage/AdsPage.css";
import "./AdDetail.css";
import DefaultPhoto from "../../shared/defaultPhoto/DefaultPhoto";
import Button from "../../shared/Button";
import Modal from "../../shared/modal/Modal";
import ErrorModal from "../../shared/modal/ErrorModal";

const AdDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ad, setAd] = useState(null);
  const [deleteAdId, setDeleteAdId] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const resetError = () => {
    setError(null);
  };

  const handleDeleteMessage = () => {
    setShowDeleteMessage(false);
    navigate("/adverts");
  };

  const handleShowModalconfirm = async event => {
    const removeAd = await deleteAd(params.id);
    setDeleteAdId(removeAd);
    setShowDeleteMessage(true);
    console.log(deleteAdId);
  };

  const handleShowModalCancel = () => {
    setShowModal(true);
  };

  const handleButton = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getAd(params.id)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.status === 404) {
          return navigate("/404");
        }
        setError(error);
      });
  }, [params.id, navigate]);

  return (
    <Layout title="Detalle del anuncio">
      {(ad || error) && (
        <div className="ad-detail">
          <div className="ad">
            <span className="text"> articulo {ad.name}</span>
            <span className="text">
              Estado: {ad.sale === true ? "Venta" : "Compra"}
            </span>
            <span className="text">{ad.price} Euros</span>
            <span className="img">
              {ad.photo === null ? (
                <DefaultPhoto className="img" />
              ) : (
                <img
                  className="img"
                  src={ad.photo}
                  alt="imagenes anuncios"></img>
              )}
            </span>

            <span className="span tags">{ad.tags.join(", ")}</span>

            {showModal ? (
              <Button
                className="delete-button"
                variant="primary2"
                width="button-form"
                onClick={handleButton}
                // disabled={buttonDisabled}>
              >
                Borrar
              </Button>
            ) : (
              <Modal
                title="Confirmar acciòn"
                message="¿Estas seguro? "
                onConfirm={handleShowModalconfirm}
                onCancel={handleShowModalCancel}
              />
            )}
          </div>
          {showDeleteMessage && (
            <ErrorModal
              title="Borrar Anuncio"
              message={"Fue eliminado correctamente"}
              onCancel={handleDeleteMessage}
            />
          )}
        </div>
      )}
      {error && (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={resetError}
        />
      )}
    </Layout>
  );
};

export default AdDetail;
