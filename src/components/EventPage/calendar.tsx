import Kalend, { CalendarEvent, CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'; // import styles
import { useNavigate } from 'react-router-dom';

export interface calendarProps{
    formattedEvents: CalendarEvent[]

}
const Calendar = ({formattedEvents}: calendarProps) => {
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