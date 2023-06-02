import Layout from "../../layout/Layout";
import "./AdNew.css";
import Button from "../../shared/Button";
import { useState } from "react";
import { getForm } from "../service";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared/spinner/Spinner";
import DrawTags from "../drawTags/DrawTags";
import ErrorModal from "../../shared/modal/ErrorModal";

let ad = {};

const AdNew = () => {
  const navigate = useNavigate();
  const [isCreateAd, setIsCreateAd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const resetError = () => {
    setError(null);
  };

  const handleShowModal = () => {
    setShowModal(false);
    navigate(`/api/v1/adverts/${ad.id}`);
  };

  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sale: true,
    price: "",
  });

  const handleSelectChange = event => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      option => option.value,
    );

    setFormData({ ...formData, tags: selectedTags });
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeInputFile = e => {
    setPhoto({ ...photo, photo: e.target.files[0] });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    resetError();
    try {
      setIsCreateAd(true);

      //NOTE  Object.keys() para obtener las claves de formData
      const adNew = new FormData();

      Object.keys(formData).forEach(key => {
        adNew.append(key, formData[key]);
      });

      if (photo !== null) {
        adNew.append("photo", photo.photo);
      }

      ad = await getForm(adNew);

      setIsCreateAd(false);
      setShowModal(true);
    } catch (error) {
      setError(error);
    }
  };

  const buttonDisabled =
    !formData.name || !formData.price || !formData.tags || !formData.sale;

  return (
    <Layout title="sube un anuncio">
      {isCreateAd ? (
        <Spinner message="Cargando..." />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container-form"
          encType="multipart/form-data">
          <label className="form-label">Articulo</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre del artículo"
          />

          <div className="form-label">
            <label>Vender</label>
            <input
              className="form-input"
              type="radio"
              name="sale"
              value={true}
              onChange={handleChange}
              required
            />
            <label>Comprar</label>
            <input
              className="form-input"
              type="radio"
              name="sale"
              value={false}
              onChange={handleChange}
              required
            />
          </div>

          <label className="form-label">Precio</label>
          <input
            className="form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label className="form-label">Tag</label>

          <DrawTags handleSelectChange={handleSelectChange} />

          <label className="form-label-img">Img opcional</label>
          <input
            className="form-input"
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={handleChangeInputFile}
          />

          <Button
            type="submit"
            variant="primary"
            width="button-form"
            disabled={buttonDisabled}>
            Crear
          </Button>
        </form>
      )}

      {showModal && (
        <ErrorModal
          title="Anuncio"
          message={"Acabas de crear un nuevo anuncio"}
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
    </Layout>
  );
};

export default AdNew;
