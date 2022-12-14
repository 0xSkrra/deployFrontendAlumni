import React, { useEffect, useState } from "react"
import { Event } from "../../common/interface/Event"
import { Group } from "../../common/interface/Group"
import { Topic } from "../../common/interface/Topic"
import {
  addEvent,
  addEventGroup,
  addEventTopic,
} from "../../common/util/API"
import { useBoundStore } from "../../common/util/Store/Store"
import { useUserStore } from "../../common/util/Store/userStore"

interface CreateEventProps {
  id: number
  target: string
  group?: Group
  setGroup?: React.Dispatch<React.SetStateAction<Group>>
  topic?: Topic
  setTopic?: React.Dispatch<React.SetStateAction<Topic>>
}
export default function CreateEventModal({
  id,
  target,
  group,
  topic,
  setTopic,
  setGroup,
}: CreateEventProps) {
  const userState = useUserStore((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [event, setEvent] = useState<Event>({
    id: 0,
    name: "",
    description: "",
    lastUpdated: "",
    startTime: "",
    endTime: "",
    allowGuests: true,
    authorId: -1,
    usersAccepted: [],
    author: userState.User,
    topics: [],
    groups: [],
    usersInvited: [],
    usersResponded: [],
    posts: [],
  })
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [nameShaming, setNameShaming] = useState<boolean>(false)
  const [descShaming, setDescShaming] = useState<boolean>(false)
  const [dateShaming, setDateShaming] = useState<boolean>(false)
  const [hasInit, setHasInit] = useState<boolean>(false)
  const [displayStartTime, setDisplayStartTime] = useState(
    `${("0" + startDate.getHours()).substring(1, 3)}:${(
      "0" + startDate.getMinutes()
    ).substring(1, 3)}`
  )
  const [displayEndTime, setDisplayEndTime] = useState(
    `${("0" + (startDate.getHours() + 1)).substring(1, 3)}:${(
      "0" + startDate.getMinutes()
    ).substring(1, 3)}`
  )
  const [displayStartDate, setDisplayStartDate] = useState(
    `${startDate.toISOString().split("T")[0]}`
  )
  const [displayEndDate, setDisplayEndDate] = useState(
    `${startDate.toISOString().split("T")[0]}`
  )
  const store = useBoundStore((state) => state)

  useEffect(() => {
    setNameShaming(false)
    setDescShaming(false)
    setDateShaming(false)
    setHasInit(true)
  }, [hasInit])

  const createEvent = async () => {
    const myStartTime =
      startDate.getFullYear().toString() +
      "-" +
      ("00" + (startDate.getMonth() + 1)).toString().slice(-2) +
      "-" +
      ("00" + startDate.getDate().toString()).slice(-2) +
      "T" +
      ("00" + startDate.getHours().toString()).slice(-2) +
      ":" +
      ("00" + startDate.getMinutes().toString()).slice(-2) +
      ":00"
    const myEndTime =
      endDate.getFullYear().toString() +
      "-" +
      ("00" + (endDate.getMonth() + 1)).toString().slice(-2) +
      "-" +
      ("00" + endDate.getDate().toString()).slice(-2) +
      "T" +
      ("00" + endDate.getHours().toString()).slice(-2) +
      ":" +
      ("00" + endDate.getMinutes().toString()).slice(-2) +
      ":00"

    // error handling:
    if (event.name.length < 1) {
      setNameShaming(true)
      return
    }
    if (event.description.length < 1) {
      setDescShaming(true)
      return
    }
    if (myEndTime < myStartTime || myEndTime === myStartTime) {
      setDateShaming(true)
      return
    }
    //remove if provided
    if (event.name.length > 0) {
      setNameShaming(false)
    }
    if (event.description.length > 0) {
      setDescShaming(false)
    }
    if (myEndTime > myStartTime) {
      setDateShaming(false)
    }

    if (target === "topic") {
      const topic = userState.User.topics.find((x) => x.id === id)
      const eventUpdate: Event = {
        id: 0,
        name: "",
        description: "",
        lastUpdated: "",
        startTime: "",
        endTime: "",
        allowGuests: true,
        usersAccepted: [],
        authorId: userState.User.id,
        author: userState.User,
        topics: [topic!],
        usersInvited: [],
        usersResponded: [],
        posts: [],
      }
      setEvent(eventUpdate)
      const req: Event = await addEvent(
        event.name,
        event.description,
        myStartTime,
        myEndTime
      ) // Add target
      var request = await addEventTopic(req.id, topic!.id)
      if (
        request.status === 200 ||
        request.status === 201 ||
        request.status === 204
      ) {
        userState.setUser({
          ...userState.User,
          authoredEvents: [...userState.User.authoredEvents, req],
        })
        if (topic && setTopic) {
          store.addEventToTopic(req, topic.id)
          setTopic((state) => ({
            ...state,
            events: [...state.events, req],
          }))
        }
        setShowModal(false)
      }
    } else if (target === "group") {
      const group = userState.User.groups.find((x) => x.id === id)
      const groupUpdate: Event = {
        id: 0,
        name: "",
        description: "",
        lastUpdated: "",
        startTime: "",
        endTime: "",
        allowGuests: true,
        usersAccepted: [],
        authorId: userState.User.id,
        author: userState.User,
        groups: [group!],
        usersInvited: [],
        usersResponded: [],
        posts: [],
      }
      setEvent(groupUpdate)
      const req: Event = await addEvent(
        event.name,
        event.description,
        myStartTime,
        myEndTime
      ) // Add target
      request = await addEventGroup(req.id, group!.id)
      if (
        request.status === 200 ||
        request.status === 201 ||
        request.status === 204
      ) {
        userState.setUser({
          ...userState.User,
          authoredEvents: [...userState.User.authoredEvents, req],
        })
        if (group && setGroup) {
          store.addEventToGroup(req, group.id)
          setGroup((state) => ({
            ...state,
            events: [...state.events, req],
          }))
        }
        setShowModal(false)
      }
    }
  }

  const formatTime = (time: Date) => {
    return `${("0" + time.getHours()).substring(1, 3)}:${(
      "0" + time.getMinutes()
    ).substring(1, 3)}`
  }

  const createStartDate = (date: string) => {
    const year = parseInt(date.slice(0, 4))
    startDate.setFullYear(year)
    const month = parseInt(date.slice(5, 7)) - 1
    startDate.setMonth(month)
    const day = parseInt(date.slice(8, 10))
    startDate.setDate(day)
  }

  const createStartTime = (time: string) => {
    const hour = parseInt(time.slice(0, 2))
    const minute = parseInt(time.slice(3, 5))
    startDate.setHours(hour, minute)
  }

  const createEndDate = (date: string) => {
    const year = parseInt(date.slice(0, 4))
    endDate.setFullYear(year)
    const month = parseInt(date.slice(5, 7)) - 1
    endDate.setMonth(month)
    const day = parseInt(date.slice(8, 10))
    endDate.setDate(day)
  }
  const createEndTime = (time: string) => {
    const hour = parseInt(time.slice(0, 2))
    const minute = parseInt(time.slice(3, 5))
    endDate.setHours(hour, minute)
  }

  const onCLickNewEvent = () => {
    setStartDate(new Date())
    setEndDate(new Date())
    let endHours = startDate.getHours() + 1
    endDate.setHours(endHours)
    setDisplayStartTime(formatTime(startDate))
    setDisplayEndTime(formatTime(endDate))
    setShowModal(true)
  }

  return (
    <>
      <button
        className="inline-flex text-justify justify-center text-green-700 fill-green-700 align-bottom px-3 py-2 rounded-md  border-2 text-color border-green-700 hoverColor hover:text-white hover:fill-white transition-all duration-200"
        type="button"
        onClick={() => {
          onCLickNewEvent()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M17 22v-3h-3v-2h3v-3h2v3h3v2h-3v3ZM5 20q-.825 0-1.413-.587Q3 18.825 3 18V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h6V2h2v2h1q.825 0 1.413.588Q19 5.175 19 6v6.1q-.5-.075-1-.075t-1 .075V10H5v8h7q0 .5.075 1t.275 1ZM5 8h12V6H5Zm0 0V6v2Z"/></svg>
         <span className="ml-1">New Event</span> 
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Event
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ??
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="bg-white-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-1">
                    Name of Event
                  </label>

                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    required
                    onChange={(e) => {
                      setEvent((state) => ({
                        ...state,
                        name: e.target.value,
                      }))
                    }}
                  />
                  {nameShaming && (
                    <p className="color-red-300">
                      please provide a name
                    </p>
                  )}
                  <label className="block text-black text-sm font-bold mb-1">
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description..."
                    onChange={(e) => {
                      setEvent((state) => ({
                        ...state,
                        description: e.target.value,
                      }))
                    }}
                  />
                  {descShaming && (
                    <p className="color-red-300">
                      please provide a description
                    </p>
                  )}
                  <label
                    className="block text-black text-sm font-bold mb-1"
                    htmlFor="start"
                  >
                    Start date:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black bg-white"
                    type="date"
                    id="start"
                    name="trip-start"
                    max="2300-12-31"
                    value={
                      displayStartDate
                    } /* startDate.toISOString().split('T')[0]; */
                    onChange={(e) => {
                      createStartDate(e.target.value)
                      setDisplayStartDate(e.target.value)
                    }}
                  ></input>
                  <label
                    className="block text-black text-sm font-bold mb-1"
                    htmlFor="appt"
                  >
                    Start time:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black bg-white"
                    type="time"
                    id="appt"
                    name="appt"
                    required
                    value={`${displayStartTime}`} /* value={`${startDate.getHours()}:${startDate.getMinutes()}`} */
                    onChange={(e) => {
                      createStartTime(e.target.value)
                      setDisplayStartTime(e.target.value)
                    }}
                  ></input>
                  <label
                    className="block text-black text-sm font-bold mb-1"
                    htmlFor="start"
                  >
                    End date:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    type="date"
                    id="start"
                    name="trip-start"
                    max="2300-12-31"
                    value={displayEndDate}
                    onChange={(e) => {
                      createEndDate(e.target.value)
                      setDisplayEndDate(e.target.value)
                    }}
                  ></input>

                  <label
                    className="block text-black text-sm font-bold mb-1"
                    htmlFor="appt"
                  >
                    End time:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    type="time"
                    id="appt"
                    name="appt"
                    required
                    value={`${displayEndTime}`}
                    onChange={(e) => {
                      createEndTime(e.target.value)
                      setDisplayEndTime(e.target.value)
                    }}
                  ></input>
                  {dateShaming && (
                    <p>Please, a valid date is needed</p>
                  )}
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => createEvent()}
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
