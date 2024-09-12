import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../../../styles/modal.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import getCategory from '../../../lib/services/getCategories';
import { setAdminCategories } from '../../../redux/features/admin/categoriesSlice';
import {
  Activity,
  Category,
  Instructor,
  Member,
  TimeSlot,
} from '@prisma/client';
import { setAdminInstructors } from '../../../redux/features/admin/instructorSlice';
import getInstructor from '../../../lib/services/getInstructors';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import {
  addAdminActivity,
  updateAdminActivity,
} from '../../../redux/features/admin/activitySlice';
import { setAdminTimeSlots } from '../../../redux/features/admin/timeSlotSlice';
import getTimeSlots from '../../../lib/services/getTimeSlots';
import getMember from '../../../lib/services/getMembers';
import { setAdminMembers } from '../../../redux/features/admin/memberSlice';
import { daysOfWeek } from '../../../utils/dayOfWeek';
import {
  addAdminReservation,
  updateAdminReservation,
} from '../../../redux/features/admin/reservationsSlice';

const ModalAddReservationComponent = ({ reservation, open, handleClose }) => {
  const [memberId, setMemberId] = useState(
    reservation ? reservation.memberId : ''
  );
  const [timeSlotId, setTimeSlotId] = useState(
    reservation ? reservation.timeSlotId : ''
  );
  const [reminderEnabled, setReminderEnabled] = useState(
    reservation ? reservation.reminderEnabled : false
  );
  const timeSlots = useAppSelector((state) => state.timeSlotAdmin.timeSlots);
  const members = useAppSelector((state) => state.membersAdmin.members);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeTimeSlots = async () => {
      dispatch(setAdminTimeSlots(await getTimeSlots()));
    };
    const initializeMembers = async () => {
      dispatch(setAdminMembers(await getMember()));
    };
    initializeTimeSlots();
    initializeMembers();
  }, []);

  const handleSubmit = async () => {
    if (reservation) {
      const result = await fetch('/api/reservation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: reservation.id,
          memberId,
          timeSlotId,
          reminderEnabled,
        }),
      });
      const { data } = await result.json();
      dispatch(updateAdminReservation(data));
    } else {
      const result = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
          timeSlotId,
          reminderEnabled,
        }),
      });
      const { data } = await result.json();
      dispatch(addAdminReservation(data));
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <p className="text-center">
          {reservation ? 'Actualizar' : 'Agregar'} reservación
        </p>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel id="member-label">Estudiante</InputLabel>
            <Select
              labelId="member-label"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              label="Estudiante"
            >
              {members.map((member: Member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.name} - {member.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="timeSlot-label">Bloque de horario</InputLabel>
            <Select
              labelId="timeSlot-label"
              value={timeSlotId}
              onChange={(e) => setTimeSlotId(e.target.value)}
              label="Bloque de horario"
            >
              {timeSlots.map((timeSlot: TimeSlot & { activity: Activity }) => (
                <MenuItem key={timeSlot.id} value={timeSlot.id}>
                  {`${timeSlot.activity.name} ${
                    daysOfWeek[timeSlot.dayOfWeek]
                  } [${timeSlot.startTime}-${timeSlot.endTime}]`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel id="timeSlot-label">¿Notificaciones?</InputLabel>
          <FormControlLabel
            control={
              <Switch
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
              />
            }
            label={reminderEnabled ? 'Sí' : 'No'}
          />
        </Box>
        <div className="flex justify-between">
          <button
            onClick={() => handleClose()}
            className="bg-blue-400 rounded-lg p-2 text-white my-5 mr-2"
          >
            Cerrar
          </button>
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-600 rounded-lg p-2 text-white my-5 mr-2"
          >
            {reservation ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalAddReservationComponent;
