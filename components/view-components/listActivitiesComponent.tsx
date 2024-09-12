import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Activity, Category, Instructor, TimeSlot } from '@prisma/client';
import ActivityComponent from '../unit-components/activityComponent';
import { setActivities } from '../../redux/features/member/activitySlice';
import getActivities from '../../lib/services/getActivities';

const ListActivitiesComponent = () => {
  const activities = useAppSelector((state) => state.activity.activities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeActivities = async () =>
      dispatch(setActivities(await getActivities()));
    initializeActivities();
  }, []);

  return (
    <div className="w-1/2">
      {activities.map(
        (
          activity: Activity & {
            category: Category;
            instructor: Instructor;
            TimeSlot: TimeSlot[];
          }
        ) => {
          return <ActivityComponent activity={activity} key={activity.id} />;
        }
      )}
    </div>
  );
};

export default ListActivitiesComponent;
