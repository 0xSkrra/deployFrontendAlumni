import React, { useState } from "react"
import CalendarView from "../components/Calendar/CalendarView"
import ListComponent from "../components/ListView/ListComponent"
import TimelineComp from "../components/TimelineComp"
import keycloak from "../keycloak"


const Dashboard = () => {
    const [view, setView] = useState(true)

    function onClick() {
        setView(!view)
    }
  return (
    <div className="dashboard w-screen">
        <button onClick={() => console.log(keycloak.token)}>TOKE IT</button>
        {view && <TimelineComp /> }
        {!view && <CalendarView /> }
        <button color="primary" className="block"
        onClick={onClick}
        >button</button>
        <ListComponent />
        <aside className="w-30"></aside>
    </div>
  )
}


export default Dashboard