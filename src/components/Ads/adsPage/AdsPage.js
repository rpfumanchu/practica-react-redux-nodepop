import Layout from "../../layout/Layout";
import { getAds } from "../service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import DrawAd from "../DrawAd";
import { useEffect, useState } from "react";
import Spinner from "../../shared/spinner/Spinner";
import EmptyAdList from "../emptyAdList/EmptyAdList";
import ErrorModal from "../../shared/modal/ErrorModal";
import DrawTags from "../drawTags/DrawTags";

const AdsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [query, setQuery] = useState("");
  const [querySale, setQuerySale] = useState("");
  const [queryPriceRange, setQueryPriceRange] = useState("");
  const [noResults, setNoResult] = useState(true);
  const [queryTags, setQueryTags] = useState([]);
  const [error, setError] = useState(null);

  const resetError = () => {
    setError(null);
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

  const handleChangePriceRange = event => {
    setQueryPriceRange(event.target.value);
    setNoResult(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const ads = await getAds();

        setAds(ads);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterAdSaleValueOrDefault = ad =>
    !querySale || ad.sale.toString() === querySale;

  const filterAdName = ad =>
    (ad.name ?? "").toUpperCase().startsWith(query.toUpperCase());

  const filterAdPrice = ad => {
    if (!queryPriceRange) return true;
    switch (queryPriceRange) {
      case "opcion1":
        return ad.price < 50;
      case "opcion2":
        return ad.price >= 50 && ad.price <= 100;
      case "opcion3":
        return ad.price >= 100 && ad.price <= 250;
      case "opcion4":
        return ad.price >= 250;
      default:
        return true;
    }
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
                <label className="form-label">
                  Search:
                  <input
                    type="text"
                    style={{ borderWidth: 1 }}
                    value={query}
                    onChange={handleChange}
                  />
                </label>
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
                <label className="form-label">Precio:</label>
                <select
                  type="switch"
                  value={queryPriceRange}
                  onChange={handleChangePriceRange}>
                  <option value="" defaultChecked>
                    Todos
                  </option>
                  <option value="opcion1">0 - 50 </option>
                  <option value="opcion2">50 - 100 </option>
                  <option value="opcion3">100 - 250 </option>
                  <option value="opcion4"> &gt;250 </option>
                </select>
              </section>

              <DrawTags handleSelectChange={handleSelectChange} />

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
                        <Link to={`/api/v1/adverts/${ad.id}`}>
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
