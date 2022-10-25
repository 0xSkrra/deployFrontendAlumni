import { CalendarEvent } from "kalend"
import { useEffect, useState } from "react"
import "kalend/dist/styles/index.css" // import styles
import Calendar from "./calendar"
import { useUserStore } from "../../common/util/Store/userStore"
import { useBoundStore } from "../../common/util/Store/Store"
import { Spinner } from "../util/spinner"

const EventPage = () => {
  const userState = useUserStore((state) => state)
  const store = useBoundStore((state) => state)
  const [formattedEvents, setFormattedEvents] = useState<
    CalendarEvent[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const formatEvents = async () => {
      setLoading(true)
      const newEvents: CalendarEvent[] = store.Events.map((e) => {
        if (
          userState.User.respondedEvents.some((ue) => e.id === ue.id)
        ) {
          return {
            id: e.id,
            startAt: e.startTime,
            endAt: e.endTime,
            summary: e.name,
            color: "green",
            calendarID: "work",
            timezoneStartAt: "Europe/Berlin", // optional
            timezoneEndAt: "Europe/Berlin", // optional
          }
        } else if (
          userState.User.authoredEvents.some((ue) => e.id === ue.id)
        ) {
          return {
            id: e.id,
            startAt: e.startTime,
            endAt: e.endTime,
            summary: e.name,
            color: "black",
            calendarID: "work",
            timezoneStartAt: "Europe/Berlin", // optional
            timezoneEndAt: "Europe/Berlin", // optional
          }
        } else {
          return {
            id: e.id,
            startAt: e.startTime,
            endAt: e.endTime,
            summary: e.name,
            color: "red",
            calendarID: "work",
            timezoneStartAt: "Europe/Berlin", // optional
            timezoneEndAt: "Europe/Berlin", // optional
          }
        }
      })
      setFormattedEvents(newEvents)
      setLoading(false)
    }
    formatEvents()
  }, [
    store.Events,
    userState.User.authoredEvents,
    userState.User.respondedEvents,
  ])

  if (loading) return <Spinner />

  return (
    <div className="w-full h-full p-4">
      <Calendar formattedEvents={formattedEvents} />
    </div>
  )
}

export default EventPage
