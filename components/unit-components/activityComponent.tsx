import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAddReservationsComponent from './modalAddReservations/modalAddReservationsComponent';
import {
  faBan,
  faCheck,
  faCheckCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Reservation, TimeSlot } from '@prisma/client';

const ActivityComponent = ({ activity }) => {
  const [open, setOpen] = useState(false);
  const memberReservations = useAppSelector(
    (state) => state.memberReservations.memberReservations
  );
  const timeSlotActivityIds = activity.TimeSlot.map((timeSlot: TimeSlot) => {
    return timeSlot.id;
  }).sort((a: string, b: string) => a.localeCompare(b));
  const timeSlotMemberIds = memberReservations
    .map((reservation: Reservation) => {
      return reservation.timeSlotId;
    })
    .sort((a: string, b: string) => a.localeCompare(b));

  let isSelectedAll: boolean = timeSlotActivityIds.every((id: string) =>
    timeSlotMemberIds.includes(id)
  );

  return (
    <div className="px-5 m-4 py-5 bg-gray-100 rounded-xl">
      <p>
        <b>{activity.name}</b>
      </p>
      <div className="flex justify-between">
        <div className="inline-flex items-center bg-slate-200 py-1 px-2 mr-1 rounded-lg">
          <p>
            <b>Categoria:</b> {activity.category.name}
          </p>
          <img
            className="w-10 mx-1"
            src={activity.category.iconUrl}
            alt={'categoria' + activity.category.name}
          />
        </div>
        <div className="inline-flex items-center bg-slate-200 py-1 px-2 mr-1 rounded-lg">
          <p>
            <b>Instructor:</b> {activity.instructor.name}
          </p>
          <img
            className="w-10 mx-1"
            src={activity.instructor.iconUrl}
            alt={'instructor' + activity.instructor.name}
          />
        </div>
      </div>
      <p>{activity.description}</p>
      {activity.TimeSlot.length > 0 ? (
        isSelectedAll ? (
          <button className="bg-green-500 mr-3 mt-2 text-white px-2 rounded-lg flex items-center">
            <FontAwesomeIcon
              className="p-3 text-green-900"
              icon={faCheckCircle}
            />
            <p>Todos los bloques seleccionados</p>
          </button>
        ) : (
          <button
            className="bg-blue-500 mr-3 mt-2 text-white px-2 rounded-lg flex items-center"
            onClick={() => setOpen(true)}
          >
            <FontAwesomeIcon className="p-3" icon={faUserPlus} />
            <p>Inscribirse</p>
          </button>
        )
      ) : (
        <button className="bg-red-500 mr-3 mt-2 text-white px-2 rounded-lg flex items-center">
          <FontAwesomeIcon className="p-3" icon={faBan} />
          <p>No disponible</p>
        </button>
      )}
      {open && (
        <ModalAddReservationsComponent
          selectedOption={null}
          activityId={activity.id}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
export default ActivityComponent;
