import React, { useEffect, useState } from "react"
import { defaultPaginate, Paginate } from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import { getAllPosts, getUserEvents } from "../../common/util/API"
import { Event } from "../../common/interface/Event"
import PostItem from "../util/postItem"
import PostModal from "../util/postModal"
import dayjs from 'dayjs'
import { Spinner } from "../util/spinner"
import { useBoundStore } from "../../common/util/Store/Store"


const DashboardPage = () => {
    const [postsRaw, setPostsRaw] = useState<Post[]>([])
    const [pagination, setPagination] = useState<Paginate>(defaultPaginate)
    const [loading, setLoading] = useState<boolean>(false)
    const store = useBoundStore((state) => state) 
    const [events, setEvents] = useState<Event[]>(store.Events)
    const postsPerPage = 7

    //
    // POSTS
    //

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
            <div className="flex flex-col min-h-full w-md">
                <ol className="mt-3 pl-8 min-h-full w-full max-w-full min-w-full divide-y divider-gray-200 ">
                    <li className="min-h-full">
                        <div className=" p-3  border min-w-full min-h-full border-gray-300 h-full rounded-lg sm:flex bg-gray-100">
                            <div className="flex flex-col text-gray-600">
                                    <div className="text-base font-normal"><span className="font-medium text-gray-900 ">Upcoming Events</span></div>
                                {events.length >0 ? events.map((e) => { 
                                    return (
                                        <div key={e.id} className="flex inline-flex space-x-2">
                                        <p>{e.name} </p><p className="text-gray-600"> in </p> 
                                        <p>{dayjs(e.startTime).diff(dayjs(), 'days')} days</p>
                                        </div>
                                    ) 
                                }) : <p>No upcoming Events</p>}
                        
                                
                                <div className="flex flex-col">
                                
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>

        )
    }

export default DashboardPage