import "./DefaultPhoto.css";
const Photo = ({ ...props }) => (
  <img
    className="default-photo"
    src="https://www.redeszone.net/app/uploads-redeszone.net/2023/02/listado_errores_http_destacada.jpg"
    alt="DefaulPhoto"
    {...props}
  />
);

export default Photo;
