import Kalend, { CalendarEvent, CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'; // import styles
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEventModal from '../CreateModal/CreateEventModal';

export interface calendarProps{
    formattedEvents: CalendarEvent[]

}
const initialCalendarEvent = {
    id: -1,
    startAt: "",
    endAt: "",
    timezoneStartAt: "",
    timezoneEndAt: "",
    summary: "",
    color: "",
}
const Calendar = ({formattedEvents}: calendarProps) => {
  const [showModal, SetShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<CalendarEvent>(initialCalendarEvent)
  const navigate = useNavigate()
    
  return (
    <>
    <Kalend
            onEventClick={(e)=> {
                navigate(`/events/${e.id}`)
            }}
            events={formattedEvents}
            initialDate={new Date().toISOString()}
            hourHeight={10}
            initialView={CalendarView.AGENDA}
            disabledViews={[CalendarView.DAY]}
            onPageChange={(e) => {}}
            timeFormat={'24'}
            weekDayStart={'Monday'}
            language={'en'}
            showTimeLine={true}
            isDark={false}
            disabledDragging={true}
            autoScroll={true}
            />
    </>
  )
}

export default Calendar