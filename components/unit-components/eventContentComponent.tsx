import { Reservation } from '@prisma/client';
import ModalAddReservationsComponent from './modalAddReservations/modalAddReservationsComponent';
import { useState } from 'react';
import ModalDeleteReservationComponent from './modalDeleteReservation/modalDeleteReservationComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const EventContentComponent = ({ eventInfo, memberReservations }) => {
  const [open, setOpen] = useState(false);
  let isReserved = false;
  isReserved = memberReservations.some(
    (reservation: Reservation) => reservation.timeSlotId === eventInfo.event.id
  );
  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <p className="mr-1 flex items-center justify-center">
          {isReserved && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="1x"
              style={{ color: 'green' }}
            />
          )}
          <b className="ml-1">{eventInfo.event.title}</b>
        </p>
        <b className="flex text-xs justify-center">{eventInfo.timeText}</b>
      </div>
      {open && !isReserved && (
        <ModalAddReservationsComponent
          selectedOption={eventInfo.event.id}
          activityId={eventInfo.event._def.extendedProps.activityId}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
      {open && isReserved && (
        <ModalDeleteReservationComponent
          selectedOption={eventInfo.event.id}
          activityId={eventInfo.event._def.extendedProps.activityId}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
export default EventContentComponent;
