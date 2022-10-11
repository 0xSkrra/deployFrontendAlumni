import Calendar from 'react-calendar'
import {useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import { time } from 'console';
import AddNewEvent from '../AddNewEvent';


const CalendarView = () => {
        
    const [date, setDate] = useState<Date>(new Date())
    const [selectDate, setSelectDate] = useState(false)
    const [calendarText, setCalendarText] = useState("No date is selected")

    const [hideInput, setHideInput] = useState(true)
    
    const onDateChange = (newDate: Date) => {
      console.log(newDate)
    }

    const getTimeNow = () => {
      let now: Date = new Date()
      let hours:string = now.getHours().toString()
      let minutes:string = now.getMinutes().toString()
      let returnTime:string = hours + ':' + minutes
      return returnTime
    }

    const handleAddDateClick = () => {
      let inputTime:string = getTimeNow()
      setHideInput(!hideInput)
      console.log(inputTime);
      
    }

    // TODO add time to event
    const addEvent = (date:Date, calendarText:string) => {
      console.log("Event has been created and done fuckall with");
      
      return [date, calendarText]
    }

    function logDate() {
        console.log(date);
        
    }

    return (
      <div>
        <button onClick={logDate}>get my date</button>
        <Calendar onChange={(onDateChange)} value={date} 
        selectRange={false} onClickDay={() => setDate} 
        className="react-calendar"
        />
        <AddNewEvent />
           
      </div>
    )
}

export default CalendarView