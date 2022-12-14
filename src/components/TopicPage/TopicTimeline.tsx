import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  defaultPaginate,
  Paginate,
} from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import { placeholderTopic, Topic } from "../../common/interface/Topic"
import {
  addTopicMember,
  getAllPostsForTopic,
  getTopicById,
  leaveTopic,
} from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"
import CreatePostModal from "../CreateModal/CreatePostModal"
import CreateEventModal from "../CreateModal/CreateEventModal"
import PostItem from "../Posts/PostItem"
import { Spinner } from "../util/spinner"
import dateHandler from "../../common/util/dayjs"
import { useBoundStore } from "../../common/util/Store/Store"

const TopicTimeline = () => {
  const [postsRaw, setPostsRaw] = useState<Post[]>([])
  const [pagination, setPagination] =
    useState<Paginate>(defaultPaginate)
  const [loading, setLoading] = useState<boolean>(false)
  const [topic, setTopic] = useState<Topic>(placeholderTopic)
  const user = useUserStore((state) => state.User)
  const [membership, setMembership] = useState<boolean>(false)
  const store = useBoundStore((state) => state)
  const userState = useUserStore((state) => state)
  const postsPerPage = 6
  const params = useParams()
  const id = typeof params.id === "undefined" ? -1 : params.id
  const [topicId] = useState(isNaN(+id) ? -1 : +id)
  const sortedEvents = topic.events?.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      new Date(a.startTime).getTime() -
      new Date(b.startTime).getTime()
    )
  })
  const navigate = useNavigate()

  //
  // POSTS
  //

  useEffect(() => {
    const fetchAndCreatePosts = async () => {
      if (topicId === -1) return // nav to error page
      setLoading(true)
      const response = await getAllPostsForTopic(
        topicId,
        pagination.CurrentPage,
        postsPerPage
      )
      const relatedPosts: Post[] = response.data
      const headers = response.pagination
      // save posts to store here... create post store first...

      // save states
      setPostsRaw(relatedPosts)
      setPagination(headers)
      setLoading(false)
    }
    fetchAndCreatePosts()
  }, [pagination.CurrentPage, topicId])

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true)
      const response = await getTopicById(topicId)
      const relatedTopic: Topic = response
      setLoading(false)
      setTopic(relatedTopic)
    }
    fetchTopic()
  }, [topicId])

  const checkMembership = () => {
    let member = userState.User.topics.find((x) => x.id === topic?.id)

    if (member !== undefined) {
      setMembership(true)
    }
  }

  if (membership === false) {
    checkMembership()
  }

  const handleJoin = () => {
    setLoading(true)
    let req = addTopicMember(topic.id)
    const updatedUser = { ...user, topics: [...user.topics, topic] }
    userState.setUser(updatedUser)
    req
      .then((s) =>
        s.status < 400
          ? setMembership(!membership)
          : setMembership(membership)
      )
      .finally(() => {
        setLoading(false)
        store.fetchEvents()
      })
  }

  const handleLeave = async () => {
    setLoading(true)

    let req = leaveTopic(topic.id)
    const updatedUser = {
      ...user,
      topics: userState.User.topics.filter((t) => t.id !== topic.id),
    }
    userState.setUser(updatedUser)
    req
      .then((s) =>
        s.status < 400
          ? setMembership(!membership)
          : setMembership(membership)
      )
      .finally(() => {
        setLoading(false)
        store.fetchEvents()
      })
  }

  //
  // PAGINATION METHODS
  //
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

  if (loading) return <Spinner />

  return (
    <div className="backgroundcolorMain h-full">
      <div className="p-4 mb-4 flex flex-row rounded-lg">
        <div className="flex flex-col min-w-[70%]">
          <div className=" text-gray-800 ">
            <div className="justify-center flex mb-3">
              <h1 className="text-3xl font-semibold">
                {topic?.title}
              </h1>
            </div>
            <div className="justify-center flex text-center mb-3">
              <p>{topic?.body}</p>
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
                  <div className="text-base font-normal mb-3 text-center">
                    {topic.users.length !== 1 && (
                      <span className="font-medium text-gray-900 ">
                        {topic.users.length} Members
                      </span>
                    )}
                    {topic.users.length === 1 && (
                      <span className="font-medium text-gray-900">
                        {topic.users.length} Member
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row items-center space-x-2 mb-2">
                    {membership && (
                      <button
                        disabled={loading}
                        className="inline-flex text-left text-red-700 fill-red-700 align-bottom px-3 py-2 rounded-md  border-2  text-color border-red-700 hoverColor2 hover:text-white hover:fill-white transition-all duration-200"
                        onClick={() => {
                          handleLeave()
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          width="24"
                          >
                          <path d="M16 11V9h6v2Zm-7 1q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q10.4 15 9 15t-2.775.337Q4.85 15.675 3.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q11 8.825 11 8t-.587-1.412Q9.825 6 9 6q-.825 0-1.412.588Q7 7.175 7 8t.588 1.412Q8.175 10 9 10Zm0-2Zm0 10Z" />
                        </svg>
                         <span className="ml-1">Leave Topic</span> 
                      </button>
                    )}
                    {!membership && (
                      <button
                        disabled={loading}
                        className="inline-flex text-left text-green-700 fill-green-700 align-bottom px-3 py-2 rounded-md  border-2 text-color border-green-700 hoverColor hover:text-white hover:fill-white transition-all duration-200"
                        onClick={() => {
                          handleJoin()
                        }}
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        >
                        <path d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q10.4 15 9 15t-2.775.337Q4.85 15.675 3.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q11 8.825 11 8t-.587-1.412Q9.825 6 9 6q-.825 0-1.412.588Q7 7.175 7 8t.588 1.412Q8.175 10 9 10Zm0-2Zm0 10Z" />
                      </svg>
                        <span className="ml-1">Join Topic</span>  
                      </button>
                    )}
                    {membership && (
                      <CreatePostModal
                        posts={postsRaw}
                        setPagination={setPagination}
                        setPosts={setPostsRaw}
                        id={topic.id}
                        target={"topic"}
                      />
                    )}
                  </div>
                  {membership && (
                    <CreateEventModal
                      topic={topic}
                      setTopic={setTopic}
                      id={topic.id}
                      target={"topic"}
                    />
                  )}
                  <div className="text-base font-normal">
                    <span className="font-medium text-gray-900 ">
                      Upcoming Events
                    </span>
                  </div>
                  <ul>
                    {sortedEvents.length > 0 ? (
                      sortedEvents
                        .sort((a, b) =>
                          dayjs(a.startTime).isAfter(
                            dayjs(b.startTime)
                          )
                            ? 1
                            : -1
                        )
                        .map((e) => {
                          return (
                            <li
                              key={e.id}
                              className="text-body-color mb-4 flex text-base text-ellipsis overflow-x-hidden"
                            >
                              <span className="text-primary mr-2 flex items-center rounded-full text-base">
                                <svg
                                  width="20"
                                  height="8"
                                  viewBox="0 0 20 8"
                                  className="fill-current"
                                >
                                  <path d="M19.2188 2.90626L17.0625 0.343758C16.875 0.125008 16.5312 0.0937583 16.2812 0.281258C16.0625 0.468758 16.0312 0.812508 16.2188 1.06251L18.25 3.46876H0.9375C0.625 3.46876 0.375 3.71876 0.375 4.03126C0.375 4.34376 0.625 4.59376 0.9375 4.59376H18.25L16.2188 7.00001C16.0312 7.21876 16.0625 7.56251 16.2812 7.78126C16.375 7.87501 16.5 7.90626 16.625 7.90626C16.7812 7.90626 16.9375 7.84376 17.0312 7.71876L19.1875 5.15626C19.75 4.46876 19.75 3.53126 19.2188 2.90626Z"></path>
                                </svg>
                              </span>
                              <span
                                onClick={() =>
                                  navigate(`/events/${e.id}`)
                                }
                                className="hover:text-blue-300 hover:cursor-pointer text-xs mr-1 text-gray-900 text-bold"
                              >
                                {e.name}{" "}
                              </span>
                              <span className="text-xs">
                                {" "}
                                in{" "}
                                {dateHandler(e.startTime).fromNow(
                                  true
                                )}
                              </span>
                            </li>
                          )
                        })
                    ) : (
                      <p>No upcoming Events</p>
                    )}
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default TopicTimeline
