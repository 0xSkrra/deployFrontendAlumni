import React, { useState } from "react"
import CalendarView from "../components/CalendarView"
import TimelineComp from "../components/TimelineComp"


const Dashboard = () => {
    const [view, setView] = useState(true)

    function onClick() {
        setView(!view)
    }
  return (
    <div className="dashboard w-screen">
        {/*sidebar, top view*/}
        {view && <TimelineComp /> }
        {!view && <CalendarView /> }
        <button color="primary" className="block"
        onClick={onClick}
        >button</button>
        <aside className="w-30"></aside>
    </div>
  )
}


export default Dashboard