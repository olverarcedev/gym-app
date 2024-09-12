import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';

const ModalActionsComponent = ({ handleClose, onSubmit }) => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between py-3">
      <button
        className="bg-red-700 text-white px-2 rounded-lg flex items-center"
        onClick={handleClose}
      >
        <FontAwesomeIcon className="p-3" icon={faTimes} />
        <b>Cerrar</b>
      </button>
      {session?.user ? (
        <button
          className="bg-blue-500 text-white px-2 rounded-lg flex items-center"
          onClick={onSubmit}
        >
          <FontAwesomeIcon className="p-3" icon={faUserPlus} />
          <b>Inscribirse</b>
        </button>
      ) : (
        <button
          className="flex items-center bg-black rounded-lg px-3 text-white h-10"
          onClick={() => signIn('google')}
        >
          <b>Ingresa para inscribirte</b>
          <FontAwesomeIcon className="p-3" icon={faGoogle} />
        </button>
      )}
    </div>
  );
};
export default ModalActionsComponent;
