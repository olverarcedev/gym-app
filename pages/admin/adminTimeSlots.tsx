import AdminPageLayout from './adminPageLayout';
import TableTimeSlotsComponent from '../../components/view-components/tableTimeSlotsComponent';

const AdminTimeSlots = () => {
  return (
    <AdminPageLayout>
      <p className="text-center text-lg bg-slate-700 text-white p-2">
        Bloques de horario
      </p>
      <TableTimeSlotsComponent />
    </AdminPageLayout>
  );
};
export default AdminTimeSlots;
