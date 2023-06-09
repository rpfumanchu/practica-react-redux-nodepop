import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import "../adsPage/AdsPage.css";
import "./AdDetail.css";
import DefaultPhoto from "../../shared/defaultPhoto/DefaultPhoto";
import Button from "../../shared/Button";
import Modal from "../../shared/modal/Modal";
import ErrorModal from "../../shared/modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { getAdId, getUserInterface } from "../../../store/selectors";
import {
  adDelete,
  adLoad,
  toggleModalDelete,
  userInterfaceResetError,
} from "../../../store/actions";

const AdDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const ad = useSelector(getAdId(id));
  const { showModalDelete, error } = useSelector(getUserInterface);

  const resetError = () => {
    dispatch(userInterfaceResetError());
  };

  const handleShowModalconfirm = event => {
    dispatch(adDelete(id));

    dispatch(toggleModalDelete());
    console.log(id);
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModalDelete());
  };

  const handleButton = () => {
    dispatch(toggleModalDelete());
  };

  useEffect(() => {
    dispatch(adLoad(id)).catch(error => {});
  }, [dispatch, id]);

  return (
    <Layout title="Detalle del anuncio">
      {error ? (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={resetError}
        />
      ) : (
        ad && (
          <div className="ad-detail">
            <div className="ad">
              <span className="text">articulo {ad.name}</span>
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

              {showModalDelete ? (
                <Button
                  className="delete-button"
                  variant="primary2"
                  width="button-form"
                  onClick={handleButton}>
                  Borrar
                </Button>
              ) : (
                <Modal
                  title="Confirmar acción"
                  message="¿Estás seguro?"
                  onConfirm={handleShowModalconfirm}
                  onCancel={handleShowModalCancel}
                />
              )}
            </div>
          </div>
        )
      )}
    </Layout>
  );
};

export default AdDetail;
