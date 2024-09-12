import AdminPageLayout from './adminPageLayout';
import TableActivitiesComponent from '../../components/view-components/tableActivitiesComponent';

const AdminActivities = () => {
  return (
    <AdminPageLayout>
      <p className="text-center text-lg bg-slate-700 text-white p-2">
        Actividades
      </p>
      <TableActivitiesComponent />
    </AdminPageLayout>
  );
};
export default AdminActivities;
