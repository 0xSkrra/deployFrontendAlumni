import Kalend, { CalendarEvent, CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'; // import styles
import { useState } from 'react';
import CreateEventModal from '../CreateModal/CreateEventModal';

export interface calendarProps{
    formattedEvents: CalendarEvent[]
}

const Calendar = ({formattedEvents}: calendarProps) => {
  const [showModal, SetShowModal] = useState(false)
    
  return (
    <>
    <Kalend
            onEventClick={(e)=> {
                SetShowModal(true)
                console.log(e)
            }}
            events={formattedEvents}
            initialDate={new Date().toISOString()}
            hourHeight={10}
            initialView={CalendarView.WEEK}
            disabledViews={[CalendarView.DAY]}
            onPageChange={(e) => console.log('fuck', e)}
            timeFormat={'24'}
            weekDayStart={'Monday'}
            language={'en'}
            showTimeLine={true}
            isDark={false}
            disabledDragging={true}
            autoScroll={true}
            />
        <CreateEventModal showModal={showModal} setShowModal={() => SetShowModal(!showModal)} />
    </>
  )
}

export default Calendar