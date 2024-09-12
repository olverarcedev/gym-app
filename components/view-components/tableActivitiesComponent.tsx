import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Activity, Category, Instructor } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { textDataGrid, theme } from '../../lib/theme';
import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  setAdminActivities,
  deleteAdminActivity,
} from '../../redux/features/admin/activitySlice';
import getActivities from '../../lib/services/getActivities';
import ModalAddActivityComponent from '../unit-components/admin/modalAddActivityComponent';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nombre', width: 150 },
  { field: 'description', headerName: 'Descripción', width: 400 },
  {
    field: 'category',
    headerName: 'Categoría',
    width: 150,
  },
  {
    field: 'instructor',
    headerName: 'Instructor',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      const activities = useAppSelector(
        (state) => state.activityAdmin.activities
      );
      const [open, setOpen] = useState(false);
      const handleClose = () => setOpen(false);
      const activity = activities.find((activity) => activity.id == params.id);
      const dispatch = useAppDispatch();
      return (
        <div className="flex justify-evenly items-center" key={params.id}>
          <button className="flex" onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={async () => {
              try {
                const result = await fetch(`/api/activity/${params.id}`, {
                  method: 'DELETE',
                });
                const { data } = await result.json();
                if (!result.ok) {
                  throw new Error('No se pudo eliminar la actividad');
                }
                dispatch(deleteAdminActivity(data.id));
              } catch (error) {
                params.row.setErrorOpen(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <ModalAddActivityComponent
            key={params.id}
            activity={activity}
            handleClose={handleClose}
            open={open}
          />
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableActivitiesComponent() {
  const activities = useAppSelector((state) => state.activityAdmin.activities);
  const activitiesStatus = useAppSelector(
    (state) => state.activityAdmin.status
  );
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeActivities = async () =>
      dispatch(setAdminActivities(await getActivities()));
    if (activitiesStatus != 'success') {
      initializeActivities();
    }
  }, [activitiesStatus]);

  return (
    <div>
      <div className="flex justify-end">
        <button className="m-3" onClick={() => setOpen(true)}>
          <FontAwesomeIcon className="size-5" icon={faCirclePlus} />
          <p>Agregar</p>
        </button>
        <ModalAddActivityComponent
          activity={null}
          handleClose={() => setOpen(false)}
          open={open}
        />
      </div>
      <Paper sx={{ height: 400, width: '100%' }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            onRowSelectionModelChange={(event) => console.log(event)}
            rows={activities.map(
              (
                activity: Activity & {
                  category: Category;
                  instructor: Instructor;
                }
              ) => {
                return {
                  id: activity.id,
                  name: activity.name,
                  description: activity.description,
                  category: activity.category.name,
                  instructor: activity.instructor.name,
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
            sx={{ border: 0 }}
            localeText={textDataGrid}
          />
        </ThemeProvider>
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setErrorOpen(false)} severity="error">
            Antes elimina los bloques de horario de la actividad
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}
