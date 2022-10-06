import Calendar from 'react-calendar'
import {useState} from 'react'
import 'react-calendar/dist/Calendar.css';


const CalendarView = () => {
        
    const [date, setDate] = useState<Date>(new Date())
    const [showTime, setShowTime] = useState(false)
    

    const onDateChange = (newDate: Date) => {
      console.log(newDate)
    }

    function logDate() {
        console.log(date);
        
    }

    return (
      <div>
           <Calendar onChange={onDateChange} value={date} 
           selectRange={false} onClickDay={() => setShowTime} 
           className="react-calendar"
           />
           <button onClick={logDate}>date</button>
      </div>
    )
}

export default CalendarView