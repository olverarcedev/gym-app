import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../../../styles/modal.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Activity, TimeSlot } from '@prisma/client';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { daysOfWeek } from '../../../utils/dayOfWeek';
import getActivities from '../../../lib/services/getActivities';
import { setAdminActivities } from '../../../redux/features/admin/activitySlice';
import {
  addAdminTimeSlot,
  updateAdminTimeSlot,
} from '../../../redux/features/admin/timeSlotSlice';

const ModalAddTimeSlotComponent = ({ timeSlot, open, handleClose }) => {
  const [startTime, setStartTime] = useState(
    timeSlot ? timeSlot.startTime : '00:00:00'
  );
  const [endTime, setEndTime] = useState(
    timeSlot ? timeSlot.endTime : '00:00:00'
  );
  const [dayOfWeekId, setDayOfWeekId] = useState(
    timeSlot ? timeSlot.dayOfWeek : 0
  );
  const [activityId, setActivityId] = useState(
    timeSlot ? timeSlot.activityId : ''
  );
  const activities = useAppSelector((state) => state.activityAdmin.activities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeActivities = async () => {
      dispatch(setAdminActivities(await getActivities()));
    };
    initializeActivities();
  }, []);
  const handleSubmit = async () => {
    if (timeSlot) {
      const result = await fetch('/api/timeSlot', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: timeSlot.id,
          activityId,
          startTime,
          endTime,
          dayOfWeek: dayOfWeekId,
        }),
      });
      const { data } = await result.json();
      dispatch(updateAdminTimeSlot(data));
    } else {
      const result = await fetch('/api/timeSlot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId,
          startTime,
          endTime,
          dayOfWeek: dayOfWeekId,
        }),
      });
      const { data } = await result.json();
      dispatch(addAdminTimeSlot(data));
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
          {timeSlot ? 'Actualizar' : 'Agregar'} actividad
        </p>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Hora de inicio"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            variant="outlined"
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { step: 1 },
            }}
          />

          <TextField
            label="Hora de fin"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            variant="outlined"
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { step: 1 },
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="day-label">Día</InputLabel>
            <Select
              labelId="day-label"
              value={dayOfWeekId}
              onChange={(e) => setDayOfWeekId(e.target.value)}
              label="Día"
            >
              {daysOfWeek.map((day, index) => (
                <MenuItem key={index} value={index}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="activity-label">Actividad</InputLabel>
            <Select
              labelId="activity-label"
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
              label="activity"
            >
              {activities.map((activity: Activity) => (
                <MenuItem key={activity.id} value={activity.id}>
                  {activity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {timeSlot ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalAddTimeSlotComponent;
