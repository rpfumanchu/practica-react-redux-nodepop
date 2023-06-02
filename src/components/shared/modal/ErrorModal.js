import Button from "../Button";
import "./Modal.css";

function ErrorModal(props) {
  const { message, title, onCancel } = props;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-errorButton">
          <Button onClick={onCancel} variant="primary2">
            Click
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
