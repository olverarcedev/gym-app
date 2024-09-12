import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { textDataGrid, theme } from '../../lib/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import {
  deleteAdminMembers,
  setAdminMembers,
} from '../../redux/features/admin/memberSlice';
import getMember from '../../lib/services/getMembers';
import { Member } from '@prisma/client';
import Image from 'next/image';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'iconUrl',
    headerName: 'Icono',
    width: 70,
    renderCell(params) {
      return (
        <div className="flex justify-center m-1">
          <Image src={params.row.iconUrl} alt="icon" width={40} height={40} />
        </div>
      );
    },
  },

  { field: 'name', headerName: 'Nombre', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      const [open, setOpen] = useState(false);
      const dispatch = useAppDispatch();
      return (
        <div className="flex justify-evenly items-center relative">
          <button
            onClick={async () => {
              try {
                const result = await fetch(`/api/member/${params.id}`, {
                  method: 'DELETE',
                });
                const { data } = await result.json();
                if (!result.ok) {
                  throw new Error();
                }
                dispatch(deleteAdminMembers(data.id));
              } catch (error) {
                params.row.handleError(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableMembersComponent() {
  const members = useAppSelector((state) => state.membersAdmin.members);
  const membersStatus = useAppSelector((state) => state.membersAdmin.status);
  const [errorOpen, setErrorOpen] = useState(false);
  const handleError = (value: boolean) => setErrorOpen(value);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeMembers = async () => {
      dispatch(setAdminMembers(await getMember()));
    };
    if (membersStatus != 'success') {
      initializeMembers();
    }
  }, [membersStatus]);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={members.map((member: Member) => {
            return {
              id: member.id,
              name: member.name,
              email: member.email,
              iconUrl: member.iconUrl,
              fcmToken: member.fcmToken,
              errorOpen,
              handleError,
            };
          })}
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
          Antes elimina las reservaciones el estudiante
        </Alert>
      </Snackbar>
    </Paper>
  );
}
