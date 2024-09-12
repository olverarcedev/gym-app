import { FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../../../styles/modal.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Activity, Category, Instructor, TimeSlot } from '@prisma/client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ModalActionsComponent from './modalActionsComponent';
import ModalReminderComponent from './modalReminderComponent';
import { addMemberReservations } from '../../../redux/features/member/memberReservationsSlice';
import addManyReservations from '../../../lib/services/insertMemberReservations';
import ModalSelectTimeSlots from './modalSelectTimeSlots';

const ModalAddReservationsComponent = ({
  selectedOption,
  activityId,
  open,
  handleClose,
}) => {
  const activities = useAppSelector((state) => state.activity.activities);
  const activity: Activity & {
    category: Category;
    instructor: Instructor;
    TimeSlot: TimeSlot[];
  } = activities.find((activity) => activity.id == activityId);
  const [selectedRadioOption, setSelectedRadioOption] = useState('true');
  const [selectedSlotsOptions, setSelectedSlotsOptions] = useState(
    selectedOption ? [selectedOption] : []
  );
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedRadioOption(event.target.value);
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedSlotsOptions(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onSubmit = async () => {
    const updateMemberReservations = async () =>
      dispatch(
        addMemberReservations(
          await addManyReservations(
            session,
            selectedSlotsOptions,
            selectedRadioOption
          )
        )
      );
    await updateMemberReservations();
    handleClose();
  };
  if (!activity) return;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <p className="mb-10">Inscripción para {activity.name}</p>
        </Typography>
        <Box>
          <form action="">
            <label htmlFor="selectSlots">
              Seleccione el(los) bloque(s) disponibles:
            </label>
            <FormControl sx={{ marginBottom: 5, width: '100%' }}>
              <InputLabel id="multiple-checkbox-label">
                Bloques de Horario
              </InputLabel>
            </FormControl>
            <br />
            <ModalSelectTimeSlots
              activityId={activityId}
              handleChange={handleSelectChange}
              selectedSlotsOptions={selectedSlotsOptions}
            />
            <ModalReminderComponent
              handleRadioChange={handleRadioChange}
              selectedRadioOption={selectedRadioOption}
            />
          </form>
        </Box>
        <ModalActionsComponent handleClose={handleClose} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};
export default ModalAddReservationsComponent;
