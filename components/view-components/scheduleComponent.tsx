import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSession } from 'next-auth/react';
import getEvents from '../../lib/services/getEvents';
import EventContentComponent from '../unit-components/eventContentComponent';
import { setTimeSlots } from '../../redux/features/member/timeSlotSlice';
import getTimeSlots from '../../lib/services/getTimeSlots';
import { Session } from 'next-auth';
import getMemberReservation from '../../lib/services/getMemberReservations';
import { setMemberReservations } from '../../redux/features/member/memberReservationsSlice';

const ScheduleComponent = () => {
  const { data: session } = useSession();
  const timeSlots = useAppSelector((state) => state.timeSlot.timeSlots);
  const memberReservations = useAppSelector(
    (state) => state.memberReservations.memberReservations
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeTimeSlots = async () =>
      dispatch(setTimeSlots(await getTimeSlots()));
    initializeTimeSlots();
  }, []);
  useEffect(() => {
    if (session && session.user) {
      const initializeMemberReservations = async (session: Session) =>
        dispatch(setMemberReservations(await getMemberReservation(session)));
      initializeMemberReservations(session);
    }
  }, [session]);

  return (
    <div className="w-1/2 p-2">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView={'timeGridWeek'}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        height={520}
        events={getEvents(timeSlots, memberReservations)}
        eventContent={(eventInfo) => (
          <EventContentComponent
            eventInfo={eventInfo}
            memberReservations={memberReservations}
          />
        )}
        locale={esLocale}
      />
    </div>
  );
};

export default ScheduleComponent;
