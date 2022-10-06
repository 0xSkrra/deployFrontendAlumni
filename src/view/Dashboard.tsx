import React, { useState } from "react"
import CalendarView from "../components/CalendarView"
import TimelineComp from "../components/TimelineComp"


const Dashboard = () => {
    const [view, setView] = useState(true)

    function onClick() {
        setView(!view)
    }
  return (
    <div className="dashboard">
        {/*sidebar, top view*/}
        <button color="primary"
        onClick={onClick}
        >button</button>
        {view && <TimelineComp /> }
        {!view && <CalendarView /> }
        
    </div>
  )
}


export default Dashboard