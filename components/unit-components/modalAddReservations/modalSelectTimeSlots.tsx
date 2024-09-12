import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { daysOfWeek } from '../../../utils/dayOfWeek';
import {
  Activity,
  Category,
  Instructor,
  Reservation,
  TimeSlot,
} from '@prisma/client';
import { useAppSelector } from '../../../redux/hooks';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

const ModalSelectTimeSlots = ({
  selectedSlotsOptions,
  handleChange,
  activityId,
}) => {
  const { data: session } = useSession();
  const memberReservations = useAppSelector(
    (state) => state.memberReservations.memberReservations
  );
  const activities = useAppSelector((state) => state.activity.activities);
  const activity: Activity & {
    category: Category;
    instructor: Instructor;
    TimeSlot: TimeSlot[];
  } = activities.find((activity) => activity.id == activityId);
  return (
    <Select
      labelId="multiple-checkbox-label"
      id="multiple-checkbox"
      multiple
      value={selectedSlotsOptions}
      onChange={handleChange}
      input={<OutlinedInput label="Bloques de Horario" />}
      className="w-full"
      renderValue={(selected) => {
        const selectedTimeSlots = activity.TimeSlot.filter(
          (timeSlot: TimeSlot) => selected.includes(timeSlot.id)
        );
        return selectedTimeSlots
          .map(
            (timeSlot) =>
              `${daysOfWeek[timeSlot.dayOfWeek]} ${timeSlot.startTime} - ${
                timeSlot.endTime
              }`
          )
          .join(', ');
      }}
      MenuProps={MenuProps}
    >
      {activity.TimeSlot.map((timeSlot: TimeSlot) => {
        return (
          <MenuItem key={timeSlot.id} value={timeSlot.id}>
            <Checkbox
              checked={selectedSlotsOptions.indexOf(timeSlot.id) > -1}
            />
            <ListItemText
              primary={`${daysOfWeek[timeSlot.dayOfWeek]} ${
                timeSlot.startTime
              } - ${timeSlot.endTime}`}
            />
          </MenuItem>
        );
      }).filter((menuItem) => {
        let isReserved = false;
        if (session && session.user) {
          isReserved = memberReservations.some(
            (reservation: Reservation) =>
              reservation.timeSlotId === menuItem.props.value
          );
        }
        return !isReserved;
      })}
    </Select>
  );
};
export default ModalSelectTimeSlots;
