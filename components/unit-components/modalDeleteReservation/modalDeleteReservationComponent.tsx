import { Box, Modal, Typography } from '@mui/material';
import styles from '../../../styles/modal.module.css';
import {
  Activity,
  Category,
  Instructor,
  Reservation,
  TimeSlot,
} from '@prisma/client';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ModalActionsComponent from './modalActionsComponent';
import { daysOfWeek } from '../../../utils/dayOfWeek';
import { deleteOneReservation } from '../../../redux/features/member/memberReservationsSlice';
import deleteMemberReservation from '../../../lib/services/deleteMemberReservation';

const ModalDeleteReservationComponent = ({
  open,
  handleClose,
  selectedOption,
  activityId,
}) => {
  const activities = useAppSelector((state) => state.activity.activities);
  const activity: Activity & {
    category: Category;
    instructor: Instructor;
    TimeSlot: TimeSlot[];
  } = activities.find((activity: Activity) => activity.id == activityId);
  const timeSlots = useAppSelector((state) => state.timeSlot.timeSlots);
  const memberReservations = useAppSelector(
    (state) => state.memberReservations.memberReservations
  );
  const timeSLot: TimeSlot = timeSlots.find(
    (timeSLot: TimeSlot) => timeSLot.id == selectedOption
  );
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const reservation: Reservation | null = memberReservations.find(
      (reservation: Reservation) => {
        return reservation.timeSlotId == selectedOption;
      }
    );
    if (reservation) {
      dispatch(
        deleteOneReservation(await deleteMemberReservation(reservation.id))
      );
      handleClose();
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <p>Anular inscripción para {activity.name}</p>
          <b className="text-sm">
            {daysOfWeek[timeSLot.dayOfWeek]}: {timeSLot.startTime} -{' '}
            {timeSLot.endTime}
          </b>
        </Typography>
        <Box>
          <ModalActionsComponent
            handleClose={handleClose}
            onSubmit={onSubmit}
          />
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalDeleteReservationComponent;
