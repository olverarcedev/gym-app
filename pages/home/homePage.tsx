import ScheduleComponent from '../../components/view-components/scheduleComponent';
import ListActivitiesComponent from '../../components/view-components/listActivitiesComponent';

const HomePage = () => {
  return (
    <div className="flex">
      <ListActivitiesComponent />
      <ScheduleComponent />
    </div>
  );
};
export default HomePage;
