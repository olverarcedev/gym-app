import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import getReservation from '../../lib/services/getReservations';
import {
  deleteAdminReservations,
  setAdminReservations,
} from '../../redux/features/admin/reservationsSlice';
import { Activity, Member, Reservation, TimeSlot } from '@prisma/client';
import { daysOfWeek } from '../../utils/dayOfWeek';
import { textDataGrid, theme } from '../../lib/theme';
import { ThemeProvider } from '@mui/material';
import ModalAddReservationComponent from '../unit-components/admin/modalAddReservationComponent';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'memberName', headerName: 'Nombre', width: 100 },
  { field: 'memberEmail', headerName: 'Email', width: 100 },
  { field: 'activityName', headerName: 'Actividad', width: 130 },
  { field: 'dayOfWeek', headerName: 'Día', width: 130 },
  { field: 'startTime', headerName: 'Inicio', width: 130 },
  { field: 'endTime', headerName: 'Fin', width: 130 },
  { field: 'reminderEnabled', headerName: 'Notifcaciones', width: 130 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      const [open, setOpen] = useState(false);
      const reservations = useAppSelector(
        (state) => state.reservationAdmin.reservations
      );
      const dispatch = useAppDispatch();
      const reservation = reservations.find(
        (reservation: Reservation) => reservation.id == params.id
      );
      return (
        <div className="flex justify-evenly items-center">
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={async () => {
              const result = await fetch(`/api/reservation/${params.id}`, {
                method: 'DELETE',
              });
              const { data } = await result.json();
              dispatch(deleteAdminReservations(data.id));
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <ModalAddReservationComponent
            open={open}
            handleClose={() => setOpen(false)}
            reservation={reservation}
            key={params.id}
          />
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableReservationsComponent() {
  const reservations = useAppSelector(
    (state) => state.reservationAdmin.reservations
  );
  const reservationsStatus = useAppSelector(
    (state) => state.reservationAdmin.status
  );
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeReservations = async () => {
      dispatch(setAdminReservations(await getReservation()));
    };
    if (reservationsStatus != 'success') {
      initializeReservations();
    }
  }, [reservationsStatus]);
  return (
    <div>
      <div className="flex justify-end">
        <button className="m-3" onClick={() => setOpen(true)}>
          <FontAwesomeIcon className="size-5" icon={faCirclePlus} />
          <p>Agregar</p>
        </button>
      </div>
      <ModalAddReservationComponent
        reservation={null}
        handleClose={() => setOpen(false)}
        open={open}
      />

      <Paper sx={{ height: 400, width: '100%' }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            onRowSelectionModelChange={(event) => console.log(event)}
            rows={reservations.map(
              (
                reservation: Reservation & {
                  member: Member;
                  timeSlot: TimeSlot & { activity: Activity };
                }
              ) => {
                return {
                  id: reservation.id,
                  memberName: reservation.member.name,
                  memberEmail: reservation.member.email,
                  activityName: reservation.timeSlot.activity.name,
                  dayOfWeek: daysOfWeek[reservation.timeSlot.dayOfWeek],
                  startTime: reservation.timeSlot.startTime,
                  endTime: reservation.timeSlot.endTime,
                  reminderEnabled: reservation.reminderEnabled ? 'Sí' : 'No',
                };
              }
            )}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            localeText={textDataGrid}
          />
        </ThemeProvider>
      </Paper>
    </div>
  );
}
