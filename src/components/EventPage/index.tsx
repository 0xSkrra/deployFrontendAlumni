import Kalend, { CalendarEvent, CalendarView } from 'kalend'
import React, { useEffect, useState } from 'react'
import 'kalend/dist/styles/index.css'; // import styles
import { getUserEvents } from '../../common/util/API';
import { useBoundStore } from '../../common/util/Store/Store';
import { Event } from '../../common/interface/Event';
import Calendar from './calendar';
const EventPage = () => {
    const [events, setEvents] = useState<Event[]>([])
    const fetchedEvents = useBoundStore((state) => state.Events)
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
            summary: e.description,
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