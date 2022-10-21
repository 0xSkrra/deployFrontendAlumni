import dayjs from "dayjs"
import React, {  useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { defaultPaginate, Paginate } from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import { placeholderTopic, Topic } from "../../common/interface/Topic"
import {  addTopicMember, getAllPostsForTopic, getTopicById, leaveTopic } from "../../common/util/API"
import { useBoundStore } from "../../common/util/Store/Store"
import { useUserStore } from "../../common/util/Store/userStore"
import CreatePostModal from "../CreateModal/CreatePostModal"
import PostItem from "../util/postItem"
import PostModal from "../util/postModal"
import { Spinner } from "../util/spinner"


const TopicTimeline = () => {
    const [postsRaw, setPostsRaw] = useState<Post[]>([])
    const [detailedPostView, setDetailedPostView] = useState<React.ReactNode|React.ReactNode[]>(<></>)
    const [pagination, setPagination] = useState<Paginate>(defaultPaginate)
    const [loading, setLoading] = useState<boolean>(false)
    const [topic, setTopic] = useState<Topic>(placeholderTopic)
    const user = useUserStore((state) => state.User)
    const [membership, setMembership] = useState<boolean>(false)
    const userState = useUserStore((state) => state)
    const postsPerPage = 7
    const params = useParams()
    const id = typeof params.id === 'undefined' ? -1 : params.id
    const [topicId, setTopicId] = useState(isNaN(+id) ? -1 : +id)
    const store = useBoundStore((state) => state)
    const sortedEvents = topic.events?.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.startTime).getTime()-new Date(b.startTime).getTime()
    })

    //
    // POSTS
    //
    useEffect(() => {
        const renderWhenPostIsCreated = async () => {
            const findTopic = store.Topics.find((topic) => topic.id === topicId)
            if(findTopic) setPostsRaw((state) => [findTopic.posts[findTopic.posts.length -1], ...state])
        }
        renderWhenPostIsCreated()
    },[store.Topics, topicId])

    useEffect(() => {
        const fetchAndCreatePosts = async () => {
            if(topicId === -1) return // nav to error page
            setLoading(true)
            const response = (await getAllPostsForTopic(topicId, pagination.CurrentPage, postsPerPage))
            const relatedPosts: Post[] = response.data
            const headers = response.pagination
            // save posts to store here... create post store first...
    
            // save states
            setPostsRaw(relatedPosts)
            setPagination(headers)
            setLoading(false)
        }
        fetchAndCreatePosts()
    },[pagination.CurrentPage, topicId])



    useEffect(() => {
        const fetchTopic = async () => {
            setLoading(true)
            const response = (await getTopicById(topicId))
            const relatedTopic: Topic = response
            setLoading(false)
            setTopic(relatedTopic)
        }
        fetchTopic()
    },[topicId])


    const checkMembership = () => {
        let member = userState.User.topics.find(x => x.id===topic?.id)

        if(member !== undefined){
            setMembership(true)            
        }
    }

    if (membership === false){
    checkMembership()
    }

    const handleJoin = () => {
        setLoading(true)
        let req = addTopicMember(topic.id)
        const updatedUser = {...user, topics: [...user.topics ,topic ]}
        userState.setUser(updatedUser)
        const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership)).finally(() => setLoading(false))

    }

    const handleLeave = async () => {
        setLoading(true)

        let req = leaveTopic(topic.id)
        const updatedUser = {...user, topics: userState.User.topics.filter(t => t.id !== topic.id)}
        userState.setUser(updatedUser)
        const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership)).finally(() => setLoading(false))
    }

    //
    // PAGINATION METHODS
    //
    const onClickNextPage = async () => {
        setPagination((state) => ({...state, CurrentPage: state.CurrentPage+1 }))
    }
    const onClickPrevPage = async () => {
        setPagination((state) => ({...state, CurrentPage: state.CurrentPage-1}))
    }
    const onClickSpecificPage = async (page: number) => {
        setPagination((state) => ({...state, CurrentPage: page}))
    }

    if(loading) return (
        <Spinner />)

    return (

        <div>
           
        <div className="p-4 mb-4 flex flex-row rounded-lg ">

            <div className="flex flex-col min-w-[70%]"> 
            <div className=" text-gray-800 ">
                <div className= "justify-center flex mb-3"><h1 className="text-3xl font-semibold">{topic?.title}</h1></div>
                <div className= "justify-center flex text-center mb-3"><p>{topic?.body}</p></div>
            </div> 
                {postsRaw.sort((a,b) => dayjs(a.lastUpdated).isBefore(dayjs(b.lastUpdated)) ? 1 : -1).map((p) => {
                    return p.parentId === null ?  (
                        <PostItem key={p.id} post={p}/>
                        )
                        : <React.Fragment key={p.id}></React.Fragment>
                })}
                {/* 
                PAGINATION
                */}
                <div className="flex mt-3 justify-center">
                    <nav aria-label="Page navigation example">
                    <h1 className="text-gray-500 text-center"> Showing  {(postsPerPage * pagination.CurrentPage) - postsPerPage} to {(postsPerPage * pagination.CurrentPage) > pagination.ElementCount ? pagination.ElementCount : (postsPerPage*pagination.CurrentPage)} of {pagination.ElementCount}</h1>
                        <ul className="flex list-style-none">
                        {pagination.HasPrevious && (
                            <>
                            <li className="page-item"><button
                            onClick={async () => await onClickPrevPage()}
                            disabled={!pagination.HasPrevious || loading}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </button></li>
                            <li className="page-item"><button
                            onClick={async () => await onClickSpecificPage(pagination.CurrentPage-1)}
                            disabled={!pagination.HasPrevious || loading}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage-1}</button></li>
                            
                            </>
                        )}

                        <li className="page-item"><button
                            className="page-link relative block py-1.5  px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 text-gray-800 bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage}</button></li>
                        {pagination.HasNext && (
                        <>
                        <li className="page-item"><button
                            onClick={async () => await onClickSpecificPage(pagination.CurrentPage+1)}
                            disabled={!pagination.HasNext|| loading}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage+1}</button></li>

                        
                            <li className="page-item"><button
                             onClick={async () => await onClickNextPage()}
                             disabled={!pagination.HasNext || loading}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            </button></li>
                            </>
                        )}
                        </ul>
                    </nav>
                </div>
            </div>{/* PAGINATION END */}
            
            {detailedPostView} {/* MODAL FOR POST DETAILED VIEW */}


            {/*
            UPCOMING EVENTS HERE
            */}
            <div className="flex flex-col min-w-[30.5%]">
                <ol className="mt-3 pl-8 w-full max-w-full min-w-full divide-y divider-gray-200 ">
                    <li>
                        <div className=" p-3  border min-w-full border-gray-300 h-full rounded-lg sm:flex bg-gray-100">
                            <div className="flex flex-col text-gray-600">
                            <div className="text-base font-normal mb-3 text-center">{topic.users.length!=1 && <span className="font-medium text-gray-900 ">{topic.users.length} Members</span>}
                            {topic.users.length==1 && <span className="font-medium text-gray-900">{topic.users.length} Member</span>}
                            </div>
                                <div className="flex flex-row items-center space-x-2 mb-2">
                                    {membership && <button disabled={loading} className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" onClick={() => {handleLeave()}}>Leave Topic</button>}
                                    {!membership && <button disabled={loading} className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200" onClick={() => {handleJoin()}}>Join Topic</button>}
                                {membership && <CreatePostModal id={topic.id} target={"topic"}/>}
                                </div>
                                <div className="text-base font-normal"><span className="font-medium text-gray-900 ">Upcoming Events</span></div>
                                {sortedEvents.length >0 ? sortedEvents.map((e) => { 
                                    return (
                                        <div className="flex inline-flex space-x-2">
                                        <p>{e.name} </p><p className="text-gray-600"> in </p> 
                                        <p>{dayjs(e.startTime).diff(dayjs(), 'days')} days</p>
                                        </div>
                                    ) 
                                }) : <p>No upcoming Events</p>}
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