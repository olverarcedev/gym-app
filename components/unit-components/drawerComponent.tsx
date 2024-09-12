import {
  faCalendarAlt,
  faClipboardList,
  faClock,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Drawer } from '@mui/material';
import router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOpen } from '../../redux/features/admin/drawerSlice';

const DrawerComponent = () => {
  const open = useAppSelector((state) => state.drawer.open);
  const dispatch = useAppDispatch();
  const toggleDrawer = (value: boolean) => {
    dispatch(setOpen(value));
  };

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <div className="bg-slate-600 py-1 text-white">
        <button
          className="flex w-full items-center p-2 my-2 bg-slate-700"
          onClick={() => router.push('/admin/adminActivities')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="p-2 mr-2" />
          <p>Actividades</p>
        </button>
        <button
          className="flex w-full items-center p-2 my-2 bg-slate-700"
          onClick={() => router.push('/admin/adminTimeSlots')}
        >
          <FontAwesomeIcon icon={faClock} className="p-2 mr-2" />
          <p>Bloques de horario</p>
        </button>
        <button
          className="flex w-full items-center p-2 my-2 bg-slate-700"
          onClick={() => router.push('/admin/adminReservations')}
        >
          <FontAwesomeIcon icon={faClipboardList} className="p-2 mr-2" />
          <p>Reservaciones</p>
        </button>
        <button
          className="flex w-full items-center p-2 my-2 bg-slate-700"
          onClick={() => router.push('/admin/adminMembers')}
        >
          <FontAwesomeIcon icon={faUserGraduate} className="p-2 mr-2" />
          <p>Estudiantes</p>
        </button>
      </div>
    </Drawer>
  );
};
export default DrawerComponent;
