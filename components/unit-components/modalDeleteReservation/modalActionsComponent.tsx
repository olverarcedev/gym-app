import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalActionsComponent = ({ handleClose, onSubmit }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <button
        className="bg-red-700 text-white px-2 rounded-lg flex items-center"
        onClick={handleClose}
      >
        <FontAwesomeIcon className="p-3" icon={faTimes} />
        <b>Cerrar</b>
      </button>
      {
        <button
          className="bg-blue-500 text-white px-2 rounded-lg flex items-center"
          onClick={onSubmit}
        >
          <FontAwesomeIcon className="p-3" icon={faTrashAlt} />
          <b>Anular inscripción</b>
        </button>
      }
    </div>
  );
};
export default ModalActionsComponent;
