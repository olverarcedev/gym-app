import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteAdminTimeSlot,
  setAdminTimeSlots,
} from '../../redux/features/admin/timeSlotSlice';
import getTimeSlots from '../../lib/services/getTimeSlots';
import { Activity, TimeSlot } from '@prisma/client';
import { daysOfWeek } from '../../utils/dayOfWeek';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { textDataGrid, theme } from '../../lib/theme';
import ModalAddTimeSlotComponent from '../unit-components/admin/modalAddTimeSlotComponent';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'activityName', headerName: 'Actividad', width: 120 },
  {
    field: 'dayOfWeek',
    headerName: 'Día',
    width: 100,
  },
  { field: 'startTime', headerName: 'Inicio', width: 100 },
  { field: 'endTime', headerName: 'Fin', width: 100 },
  {
    field: 'createdAt',
    headerName: 'Fecha de creación',
    width: 200,
  },
  {
    field: 'updatedAt',
    headerName: 'Fecha de actualización',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      const [open, setOpen] = useState(false);
      const timeSlots = useAppSelector(
        (state) => state.timeSlotAdmin.timeSlots
      );
      const dispatch = useDispatch();
      const timeSlot = timeSlots.find((timeSlot) => timeSlot.id == params.id);
      return (
        <div className="flex justify-around items-center">
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={async () => {
              try {
                const result = await fetch(`/api/timeSlot/${params.id}`, {
                  method: 'DELETE',
                });
                const { data } = await result.json();
                if (!result.ok) {
                  throw new Error('No se pudo eliminar el bloque de horario');
                }
                dispatch(deleteAdminTimeSlot(data.id));
              } catch (error) {
                params.row.setErrorOpen(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <ModalAddTimeSlotComponent
            timeSlot={timeSlot}
            handleClose={() => setOpen(false)}
            open={open}
          />
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableTimeSlotsComponent() {
  const [open, setOpen] = useState(false);
  const timeSlots = useAppSelector((state) => state.timeSlotAdmin.timeSlots);
  const timeSlotsStatus = useAppSelector((state) => state.timeSlotAdmin.status);
  const dispatch = useDispatch();
  const [errorOpen, setErrorOpen] = useState(false);
  useEffect(() => {
    const initializeTimeSlots = async () =>
      dispatch(setAdminTimeSlots(await getTimeSlots()));
    if (timeSlotsStatus != 'success') {
      initializeTimeSlots();
    }
  }, [timeSlotsStatus]);

  return (
    <div>
      <div className="flex justify-end">
        <button className="m-3" onClick={() => setOpen(true)}>
          <FontAwesomeIcon className="size-5" icon={faCirclePlus} />
          <p>Agregar</p>
        </button>
        <ModalAddTimeSlotComponent
          timeSlot={null}
          handleClose={() => setOpen(false)}
          open={open}
        />
      </div>
      <Paper sx={{ height: 400, width: '100%' }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={timeSlots.map(
              (timeSlot: TimeSlot & { activity: Activity }) => {
                return {
                  id: timeSlot.id,
                  activityName: timeSlot.activity.name,
                  startTime: timeSlot.startTime,
                  endTime: timeSlot.endTime,
                  dayOfWeek: daysOfWeek[timeSlot.dayOfWeek],
                  createdAt: timeSlot.createdAt,
                  updatedAt: timeSlot.updatedAt,
                  errorOpen,
                  setErrorOpen,
                };
              }
            )}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            localeText={textDataGrid}
            sx={{ border: 0 }}
          />
        </ThemeProvider>
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setErrorOpen(false)} severity="error">
            Antes elimina las reservaciones del bloque de horario
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}
