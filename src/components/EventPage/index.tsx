import  { CalendarEvent } from 'kalend'
import  { useEffect, useState } from 'react'
import 'kalend/dist/styles/index.css'; // import styles
import { getUserEvents } from '../../common/util/API';
import { Event } from '../../common/interface/Event';
import Calendar from './calendar';


const EventPage = () => {
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        const getData = async () => {
            const response = await getUserEvents().then(r => {return r})
            setEvents(response)
        }
        getData()
    })
    const formattedEvents: CalendarEvent[] = events.map((e) => {
        return {
            id: e.id,
            startAt: e.startTime,
            endAt: e.endTime,
            summary: e.name,
            color: 'blue',
            calendarID: 'work',
            Banner: e.banner,
            
            timezoneStartAt: 'Europe/Berlin', // optional
            timezoneEndAt: 'Europe/Berlin', // optional
            
        }
    })
    
  return (
    <div className='w-full h-full p-4'> 
        <Calendar formattedEvents={formattedEvents}/>
    </div>
  )
}

export default EventPage