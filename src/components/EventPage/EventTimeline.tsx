import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Event, placeholderEvent } from "../../common/interface/Event"
import {
  defaultPaginate,
  Paginate,
} from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import {
  addEventMember,
  getEventById,
  getEventPosts,
} from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"
import CreatePostModal from "../CreateModal/CreatePostModal"
import PostItem from "../Posts/PostItem"

const EventTimeline = () => {
  const [postsRaw, setPostsRaw] = useState<Post[]>([])
  const [pagination, setPagination] =
    useState<Paginate>(defaultPaginate)
  const postsPerPage = 6
  const [loading, setLoading] = useState<boolean>(false)
  const [membership, setMembership] = useState<boolean>(false)
  const userState = useUserStore((state) => state)
  const params = useParams()
  const param = useParams()
  const id = typeof params.id === "undefined" ? -1 : params.id
  const [event, setEvent] = useState<Event>(placeholderEvent)

  const checkMembership = () => {
    let member = userState.User.respondedEvents.find(
      (x) => x.id === event?.id
    )

    if (member !== undefined) {
      setMembership(true)
    }
  }
  if (membership === false) {
    checkMembership()
  }

  const handleJoin = () => {
    setLoading(true)
    let req = addEventMember(event.id)
    userState.setUser({
      ...userState.User,
      respondedEvents: [...userState.User.respondedEvents, event],
    })
    req
      .then((s) =>
        s.status < 400
          ? setMembership(!membership)
          : setMembership(membership)
      )
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const fetchAndCreatePosts = async () => {
      const response = await getEventPosts(
        +param.id!,
        pagination.CurrentPage,
        postsPerPage
      )
      const relatedPosts: Post[] = response.data
      const headers = response.pagination
      // save posts to store here... create post store first...

      // save states
      setPostsRaw(relatedPosts)
      setPagination(headers)
    }
    fetchAndCreatePosts()
  }, [pagination.CurrentPage, param.id])

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      const response: Event = await getEventById(+id)
      console.log("event is...", response)

      const relatedEvent = response
      setLoading(false)
      setEvent(relatedEvent)
    }
    fetchEvent()
  }, [id])

  const onClickNextPage = async () => {
    setPagination((state) => ({
      ...state,
      CurrentPage: state.CurrentPage + 1,
    }))
  }
  const onClickPrevPage = async () => {
    setPagination((state) => ({
      ...state,
      CurrentPage: state.CurrentPage - 1,
    }))
  }
  const onClickSpecificPage = async (page: number) => {
    setPagination((state) => ({ ...state, CurrentPage: page }))
  }

  return (
    <div className="backgroundcolorMain h-full">
      <div className="p-4 mb-4 flex flex-row rounded-lg ">
        <div className="flex flex-col min-w-[70%]">
          <div className=" text-gray-800 ">
            <div className="justify-center flex mb-3">
              <h1 className="text-3xl font-semibold">
                {event?.name}
              </h1>
            </div>
            <div className="justify-center flex text-center mb-3">
              <p>{event?.description}</p>
            </div>
          </div>
          {postsRaw
            .sort((a, b) =>
              dayjs(a.lastUpdated).isBefore(dayjs(b.lastUpdated))
                ? 1
                : -1
            )
            .map((p) => {
              return p.parentId === null ? (
                <PostItem key={p.id} post={p} />
              ) : (
                <React.Fragment key={p.id}></React.Fragment>
              )
            })}
          {/* 
                PAGINATION
                */}
          <div className="flex mt-3 justify-center">
            <nav aria-label="Page navigation example">
              <h1 className="text-gray-500 text-center">
                {" "}
                Showing{" "}
                {postsPerPage * pagination.CurrentPage -
                  postsPerPage}{" "}
                to{" "}
                {postsPerPage * pagination.CurrentPage >
                pagination.ElementCount
                  ? pagination.ElementCount
                  : postsPerPage * pagination.CurrentPage}{" "}
                of {pagination.ElementCount}
              </h1>
              <ul className="flex list-style-none">
                {pagination.HasPrevious && (
                  <>
                    <li className="page-item">
                      <button
                        onClick={async () => await onClickPrevPage()}
                        disabled={!pagination.HasPrevious || loading}
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        onClick={async () =>
                          await onClickSpecificPage(
                            pagination.CurrentPage - 1
                          )
                        }
                        disabled={!pagination.HasPrevious || loading}
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      >
                        {pagination.CurrentPage - 1}
                      </button>
                    </li>
                  </>
                )}

                <li className="page-item">
                  <button className="page-link relative block py-1.5  px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 text-gray-800 bg-gray-200 focus:shadow-none">
                    {pagination.CurrentPage}
                  </button>
                </li>
                {pagination.HasNext && (
                  <>
                    <li className="page-item">
                      <button
                        onClick={async () =>
                          await onClickSpecificPage(
                            pagination.CurrentPage + 1
                          )
                        }
                        disabled={!pagination.HasNext || loading}
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      >
                        {pagination.CurrentPage + 1}
                      </button>
                    </li>

                    <li className="page-item">
                      <button
                        onClick={async () => await onClickNextPage()}
                        disabled={!pagination.HasNext || loading}
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
        {/* PAGINATION END */}

        {/*
            UPCOMING EVENTS HERE
            */}
        <div className="flex flex-col min-w-[30.5%]">
          <ol className="mt-22 pl-8 w-full max-w-full min-w-full divide-y divider-gray-200 ">
            <li>
              <div className=" p-3  border min-w-full border-gray-300 h-full rounded-lg sm:flex bg-white">
                <div className="flex flex-col text-gray-600">
                  <div className="flex flex-row items-center space-x-2 mb-2">
                    {membership && (
                      <button
                        disabled={true}
                        className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2
                                     focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Event joined!
                      </button>
                    )}
                    {!membership && (
                      <button
                        disabled={loading}
                        className="inline-flex text-justify justify-center text-green-700 fill-green-700 align-bottom px-3 py-2 rounded-md  border-2 text-color border-green-700 hoverColor hover:text-white hover:fill-white transition-all duration-200"
                        onClick={() => {
                          handleJoin()
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 18.35 7.4 14.8l1.45-1.45 2.1 2.1 4.2-4.2 1.45 1.45ZM5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Z"/></svg>
                       <span className="ml-1">Join Event</span> 
                      </button>
                    )}
                    {membership && (
                      <CreatePostModal
                        posts={postsRaw}
                        setPagination={setPagination}
                        setPosts={setPostsRaw}
                        id={event.id}
                        target={"event"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>

        {/*
            UPCOMING EVENTS END
            */}
      </div>
    </div>
  )
}

export default EventTimeline
