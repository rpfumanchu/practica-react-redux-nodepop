/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout";
//import { getAds } from "../service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import DrawAd from "../DrawAd";
import { useEffect, useState } from "react";
import Spinner from "../../shared/spinner/Spinner";
import EmptyAdList from "../emptyAdList/EmptyAdList";
import ErrorModal from "../../shared/modal/ErrorModal";
import DrawTags from "../drawTags/DrawTags";
import { getAllAds, getUserInterface } from "../../../store/selectors";
import { adsLoaded, userInterfaceResetError } from "../../../store/actions";

const AdsPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUserInterface);
  //const [isLoading, setIsLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const [query, setQuery] = useState("");
  const [querySale, setQuerySale] = useState("");
  const [noResults, setNoResult] = useState(true);
  const [queryTags, setQueryTags] = useState([]);
  const [queryMinPrice, setQueryMinPrice] = useState("");
  const [queryMaxPrice, setQueryMaxPrice] = useState("");
  //const [error, setError] = useState(null);

  const resetError = () => {
    dispatch(userInterfaceResetError());
  };

  const handleSelectChange = event => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      option => option.value,
    );

    setQueryTags(selectedTags);
    setNoResult(true);
  };

  const resetModal = () => {
    setNoResult(false);
  };

  const handleChange = event => {
    setQuery(event.target.value);
    setNoResult(true);
  };

  const handleChangeSale = event => {
    setQuerySale(event.target.value);
    setNoResult(true);
  };

  const handleChangeMinPrice = event => {
    setQueryMinPrice(event.target.value);
    setNoResult(true);
  };

  const handleChangeMaxPrice = event => {
    setQueryMaxPrice(event.target.value);
    setNoResult(true);
  };

  //const onAdsLoaded = () => dispatch(adsLoaded());

  useEffect(() => {
    dispatch(adsLoaded()).catch(error => console.log(error));
  }, []);

  const filterAdSaleValueOrDefault = ad =>
    !querySale || ad.sale.toString() === querySale;

  const filterAdName = ad =>
    (ad.name ?? "").toUpperCase().startsWith(query.toUpperCase());

  const filterAdPrice = ad => {
    if (!queryMinPrice && !queryMaxPrice) return true;

    const minPrice = parseInt(queryMinPrice) || 0;
    const maxPrice = parseInt(queryMaxPrice) || Infinity;

    return ad.price >= minPrice && ad.price <= maxPrice;
  };

  const filterAdTags = ad => {
    const queryTagsFiltered = [...queryTags.filter(x => x !== "")]; // [""] => []
    if (queryTagsFiltered.length === 0) return true;

    return queryTagsFiltered.every(tag => ad.tags.includes(tag));
  };

  const filteredAds = ads
    .filter(filterAdSaleValueOrDefault)
    .filter(filterAdName)
    .filter(filterAdPrice)
    .filter(filterAdTags);

  return (
    <Layout title="Que quieres hacer...">
      {isLoading ? (
        <Spinner message="cargando..." />
      ) : (
        <div>
          {!!ads.length ? (
            <>
              <section className="filters">
                <label className="form-label">Search:</label>
                <input
                  type="text"
                  style={{ borderWidth: 1 }}
                  value={query}
                  onChange={handleChange}
                />
                <label className="form-label">Todos</label>
                <input
                  className="form-input"
                  type="radio"
                  name="sale"
                  value={""}
                  defaultChecked
                  onClick={handleChangeSale}
                />
                <label className="form-label">Venta</label>
                <input
                  className="form-input"
                  type="radio"
                  name="sale"
                  value={true}
                  onClick={handleChangeSale}
                />
                <label className="form-label">Compra</label>
                <input
                  className="form-input"
                  type="radio"
                  name="sale"
                  value={false}
                  onClick={handleChangeSale}
                />
              </section>
              <section className="filters">
                <label className="form-label">Precio Mínimo:</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="Introduce un precio"
                  value={queryMinPrice}
                  onChange={handleChangeMinPrice}
                />
                <label className="form-label">Precio Máximo:</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="Introduce un precio"
                  value={queryMaxPrice}
                  onChange={handleChangeMaxPrice}
                />
              </section>

              <DrawTags
                handleSelectChange={handleSelectChange}
                texto="Borrar tags"
              />

              <div className="ad-container ">
                {filteredAds.length === 0 && noResults ? (
                  <ErrorModal
                    title="Upsssss"
                    message={"No hay resultados"}
                    onCancel={resetModal}
                  />
                ) : (
                  <ul>
                    {filteredAds.map(ad => (
                      <li key={ad.id}>
                        <Link to={`/adverts/${ad.id}`}>
                          <DrawAd {...ad} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <EmptyAdList />
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

export default AdsPage;
