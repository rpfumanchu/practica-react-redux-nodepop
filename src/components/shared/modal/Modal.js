import Button from "../Button";
import "./Modal.css";

function Modal(props) {
  const { message, title, onConfirm, onCancel } = props;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          <Button onClick={onCancel} variant="primary2">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="primary3">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
