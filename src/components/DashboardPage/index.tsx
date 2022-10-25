import React, { useEffect, useState } from "react"
import { defaultPaginate, Paginate } from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import { getAllPosts } from "../../common/util/API"
import { Event } from "../../common/interface/Event"
import PostItem from "../util/postItem"
import dayjs from 'dayjs'
import { Spinner } from "../util/spinner"
import { useBoundStore } from "../../common/util/Store/Store"
import dateHandler from "../../common/util/dayjs"
import { useNavigate } from "react-router-dom"


const DashboardPage = () => {
    const [postsRaw, setPostsRaw] = useState<Post[]>([])
    const [pagination, setPagination] = useState<Paginate>(defaultPaginate)
    const [loading, setLoading] = useState<boolean>(false)
    const store = useBoundStore((state) => state) 
    const [events, setEvents] = useState<Event[]>(store.Events)
    const postsPerPage = 6
    const navigate = useNavigate()

    //
    // POSTS
    //
    useEffect(() => {
        setEvents(store.Events)
    }, [store.Events])
    useEffect(() => {
        const fetchAndCreatePosts = async () => {
            setLoading(true)
            const response = (await getAllPosts(pagination.CurrentPage, postsPerPage))
            const relatedPosts: Post[] = response.data
            const headers = response.pagination
            // save posts to store here... create post store first...
    
            // save states
            setPostsRaw(relatedPosts)
            setPagination(headers)
            setLoading(false)
        }
        fetchAndCreatePosts()
    },[pagination.CurrentPage])
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
        <div className='divide-y-2 divide-gray-900 divide-solid backgroundcolorMain'>
            <div className=" text-gray-800 ">
                <div className= "justify-center flex pb-8 pt-5"><h1 className="text-3xl font-semibold pt-3">Timeline</h1></div>
            </div> 
        <div className="p-4 mb-4 flex flex-row rounded-lg ">
            <div className="flex flex-col min-w-[70%]"> 
                {postsRaw.sort((a,b) => dayjs(a.lastUpdated).isBefore(dayjs(b.lastUpdated)) ? 1 : -1).map((p) => {
                    return p.parentId === null ?  (
                        <PostItem key={p.id} post={p} />
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
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </button></li>
                            <li className="page-item"><button
                            onClick={async () => await onClickSpecificPage(pagination.CurrentPage-1)}
                            disabled={!pagination.HasPrevious || loading}
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage-1}</button></li>
                            
                            </>
                        )}

                        <li className="page-item"><button
                            className="page-link relative block py-1.5  px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 text-gray-800 bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage}</button></li>
                        {pagination.HasNext && (
                        <>
                        <li className="page-item"><button
                            onClick={async () => await onClickSpecificPage(pagination.CurrentPage+1)}
                            disabled={!pagination.HasNext|| loading}
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage+1}</button></li>

                        
                            <li className="page-item"><button
                             onClick={async () => await onClickNextPage()}
                             disabled={!pagination.HasNext || loading}
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            </button></li>
                            </>
                        )}
                        </ul>
                    </nav>
                </div>
            </div>{/* PAGINATION END */}
            

            {/*
            UPCOMING EVENTS HERE
            */}
            <div className="flex flex-col min-h-full w-full">
                <ol className="mt-2 pl-8 min-h-full w-full max-w-full min-w-full divide-y divider-gray-200 ">
                    <li className="min-h-full w-full">
                        <div className=" p-3  border min-w-full min-h-full border-gray-300 h-full rounded-lg sm:flex bg-white">
                            <div className="flex flex-col text-gray-600 w-full">
                              <div className="text-base font-normal"><span className="font-medium text-gray-900 ">Upcoming Events</span></div>
                                <ul>
                                {events.length >0 ? events.sort((a,b) => dayjs(a.startTime).isAfter(dayjs(b.startTime)) ? 1 : -1).map((e) => { 
                                    return (
                                    <li key={e.id} className="text-body-color mb-4 flex text-base text-ellipsis overflow-x-hidden">
                                        <span className="text-primary mr-2 flex items-center rounded-full text-base">
                                        <svg width="20" height="8" viewBox="0 0 20 8" className="fill-current">
                                            <path
                                            d="M19.2188 2.90626L17.0625 0.343758C16.875 0.125008 16.5312 0.0937583 16.2812 0.281258C16.0625 0.468758 16.0312 0.812508 16.2188 1.06251L18.25 3.46876H0.9375C0.625 3.46876 0.375 3.71876 0.375 4.03126C0.375 4.34376 0.625 4.59376 0.9375 4.59376H18.25L16.2188 7.00001C16.0312 7.21876 16.0625 7.56251 16.2812 7.78126C16.375 7.87501 16.5 7.90626 16.625 7.90626C16.7812 7.90626 16.9375 7.84376 17.0312 7.71876L19.1875 5.15626C19.75 4.46876 19.75 3.53126 19.2188 2.90626Z"
                                            ></path>
                                        </svg>
                                        </span>
                                        <span  onClick={() => navigate(`/events/${e.id}`)} className="hover:text-blue-300 hover:cursor-pointer text-xs mr-1 text-gray-900 text-bold">{e.name} </span><span className="text-xs"> in {dateHandler(e.startTime).fromNow(true)}</span>
                                    </li>
                                    ) 
                                }) : <p>No upcoming Events</p>}
                                </ul>
                                
                                <div className="flex flex-col">
                                
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        </div>
        )
    }

export default DashboardPage