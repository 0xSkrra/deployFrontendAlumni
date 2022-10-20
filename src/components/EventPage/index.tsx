import  { CalendarEvent } from 'kalend'
import  { useEffect, useState } from 'react'
import 'kalend/dist/styles/index.css'; // import styles
import { getUserEvents } from '../../common/util/API';
import { Event } from '../../common/interface/Event';
import Calendar from './calendar';
import { useUserStore } from '../../common/util/Store/userStore';
import { useBoundStore } from '../../common/util/Store/Store';


const EventPage = () => {
    const userState = useUserStore((state) => state)
    const store = useBoundStore((state) => state)

    const formattedEvents: CalendarEvent[] = store.Events.map((e) => {
        if(userState.User.respondedEvents.includes(e)){
            return {
                id: e.id,
                startAt: e.startTime,
                endAt: e.endTime,
                summary: e.name,
                color: 'green',
                calendarID: 'work',
                timezoneStartAt: 'Europe/Berlin', // optional
                timezoneEndAt: 'Europe/Berlin', // optional
                
            }
        }else if(userState.User.authoredEvents.includes(e)){
            return {
                id: e.id,
                startAt: e.startTime,
                endAt: e.endTime,
                summary: e.name,
                color: 'black',
                calendarID: 'work',
                timezoneStartAt: 'Europe/Berlin', // optional
                timezoneEndAt: 'Europe/Berlin', // optional
                
            }
        }else {
            return {
                id: e.id,
                startAt: e.startTime,
                endAt: e.endTime,
                summary: e.name,
                color: 'red',
                calendarID: 'work',
                timezoneStartAt: 'Europe/Berlin', // optional
                timezoneEndAt: 'Europe/Berlin', // optional
                
            }
        }

    })
    
  return (
    <div className='w-full h-full p-4'> 
        <Calendar formattedEvents={formattedEvents}/>
    </div>
  )
}

export default EventPage