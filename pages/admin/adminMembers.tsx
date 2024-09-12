import AdminPageLayout from './adminPageLayout';
import TableMembersComponent from '../../components/view-components/tableMembersComponent';

const AdminActivities = () => {
  return (
    <AdminPageLayout>
      <p className="text-center text-lg bg-slate-700 text-white p-2">
        Estudiantes
      </p>
      <TableMembersComponent />
    </AdminPageLayout>
  );
};
export default AdminActivities;
