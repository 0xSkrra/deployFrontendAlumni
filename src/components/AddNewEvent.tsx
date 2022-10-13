import {useState} from 'react'
/* import CalendarView from './Calendar/CalendarView' */
import PopupView from '../view/PopupView'
import { Calendar } from 'react-calendar'

const AddNewEvent = () => {

  const [hideInput, setHideInput] = useState(true)
  const [calendarPopup, setCalendarPopup] = useState(false)
  const [dateSelect, setDateSelect] = useState<Date>(new Date())

  function handleDateSelect(dateVal:Date) {
    setDateSelect(dateVal)
    console.log(dateSelect, "from EventComponent");
    setCalendarPopup(false)
    
  }

  function addTimeToDate(date:Date, hour:number, minute:number) {
    date.setHours(hour)
    date.setMinutes(minute)
    return date
  }

  /* function populateNumList(end:number, increment:number){
    for (let i = 0; i < end; i++) {
      
    }
  } */

  return (
    <div>
      <button onClick={() => setHideInput(!hideInput)}>Event</button>
      { hideInput === false && 
      <div>
        <input placeholder='Event Name' className='block'></input>
          <input className='' placeholder='Event description'></input>
          <div className='pt-2'>
            <>
            <p className='inline pr-2'>Start time</p>
            <input placeholder="00" className="w-5 inline"></input>:
            <input placeholder="00" className="w-5 inline"></input>
            </><br />
            <>
            <p className='inline pr-2'>End time</p>
            <input placeholder="00" className="w-5"></input>:
            <input placeholder="00" className="w-5"></input>
            <select></select>
            </>
            <br />
            <button onClick={() => setCalendarPopup(true)}>pick date</button>
            {/*<input placeholder='date' className='startDateInput'>{dateSelect}</input>*/}
            <br/><p className='inline'>{dateSelect.getDay()}/</p>
            <p className='inline'>{dateSelect.getMonth()}/</p><p className='inline'>{dateSelect.getFullYear()}</p>
            <PopupView clickClose={() => setCalendarPopup(!calendarPopup)} 
              trigger={calendarPopup} children={<Calendar
                selectRange={false} onClickDay={e => handleDateSelect(e)}
                className="react-calendar" 
                />} 
              />
          </div>
        </div> }
  </div>
  )
}

export default AddNewEvent