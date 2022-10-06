import Calendar from 'react-calendar'
import {useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import { time } from 'console';


const CalendarView = () => {
        
    const [date, setDate] = useState<Date>(new Date())
    const [selectDate, setSelectDate] = useState(false)
    const [calendarText, setCalendarText] = useState("No date is selected")

    let placeholderTime:string = '00:00'
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
      placeholderTime = inputTime
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
           <Calendar onChange={onDateChange} value={date} 
           selectRange={false} onClickDay={() => setDate} 
           className="react-calendar"
           />
           <button onClick={logDate}>date</button>
           <button onClick={handleAddDateClick}>Add Event</button>
           { hideInput === false && <div><input placeholder='Event description'></input>
              <div>
                <>
                <input placeholder="00" className="w-6"></input>:
                <input placeholder="00" className="w-6"></input>
                </>
                <>
                <input placeholder="00" className="w-6"></input>:
                <input placeholder="00" className="w-6"></input>
                </>
              </div>
           </div> }
      </div>
    )
}

export default CalendarView