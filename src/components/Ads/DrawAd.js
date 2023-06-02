import "../Ads/adDetail/AdDetail.css";

const DrawAd = ad => {
  return (
    <div className="ad-container">
      <div className="ad-list">
        <span className="ad-name">Nombre: {ad.name}</span>
        <span className="ad-state">
          Estado: {ad.sale === true ? "Venta" : "Compra"}
        </span>
        <span className="ad-price">Precio: {ad.price}</span>
        <span className="ad-tags">Tags: {ad.tags.join(",")}</span>
      </div>
    </div>
  );
};

export default DrawAd;
