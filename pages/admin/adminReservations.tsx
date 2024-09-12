import AdminPageLayout from './adminPageLayout';
import TableReservationsComponent from '../../components/view-components/tableReservationsComponent';

const AdminReservations = () => {
  return (
    <AdminPageLayout>
      <p className="text-center text-lg bg-slate-700 text-white p-2">
        Reservaciones
      </p>
      <TableReservationsComponent />
    </AdminPageLayout>
  );
};
export default AdminReservations;
