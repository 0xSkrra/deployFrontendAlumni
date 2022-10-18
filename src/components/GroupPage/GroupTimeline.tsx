import { useKeycloak } from "@react-keycloak/web"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Group } from "../../common/interface/Group"
import { defaultPaginate, Paginate } from "../../common/interface/pagination"
import { Post } from "../../common/interface/Post"
import { getGroupPosts } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"
import PostItem from "../util/postItem"
import PostModal from "../util/postModal"


const GroupTimeline = () => {

    const [postsRaw, setPostsRaw] = useState<Post[]>([])
    const [detailedPostView, setDetailedPostView] = useState<React.ReactNode|React.ReactNode[]>(<></>)
    const [pagination, setPagination] = useState<Paginate>(defaultPaginate)
    const postsPerPage = 7
    const param = useParams()

    const onClickPost = async (postToDisplay: Post) => {
        // perhaps order post children from newest to oldest
        const postJsx = (
            <PostModal postToDisplay={postToDisplay} removeModalMethod={() => setDetailedPostView(<></>)}/>
        )
        setDetailedPostView(postJsx)
    }

    useEffect(() => {
        console.log("ficl   ",pagination.CurrentPage)
        const fetchAndCreatePosts = async () => {
            const response = (await getGroupPosts(+param.id! , pagination.CurrentPage, postsPerPage))
            const relatedPosts: Post[] = response.data
            const headers = response.pagination
            // save posts to store here... create post store first...

            // save states
            setPostsRaw(relatedPosts)
            console.log("prev");
            setPagination(headers)
            console.log("post");
        }
        fetchAndCreatePosts()
    }, [pagination.CurrentPage, param.id])




    const onClickNextPage = async () => {
        setPagination((state) => ({...state, CurrentPage: state.CurrentPage+1 }))
    }
    const onClickPrevPage = async () => {
        setPagination((state) => ({...state, CurrentPage: state.CurrentPage-1}))
    }
    const onClickSpecificPage = async (page: number) => {
        setPagination((state) => ({...state, CurrentPage: page}))
    }

    return (
        <div className="p-4 mb-4 flex flex-row rounded-lg ">
            <div className="flex flex-col min-w-[70%]"> 
                {postsRaw.map((p) => {
                    return p.parentId === null ?  (
                        <PostItem key={p.id} post={p} onClickPost={() => onClickPost(p)}/>
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
                            <li onClick={async () => await onClickPrevPage()} className="page-item"><button
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </button></li>
                            <li className="page-item"><button
                            onClick={async () => await onClickSpecificPage(pagination.CurrentPage-1)}
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
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >{pagination.CurrentPage+1}</button></li>

                        
                            <li onClick={async () => await onClickNextPage()} className="page-item"><button
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
                            <div className="text-base font-normal"><span className="font-medium text-gray-900 ">Actions</span></div>
                                <div className="flex flex-row items-center space-x-2 mb-2">
                                <button className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">New Post</button>
                                </div>
                                <div className="text-base font-normal"><span className="font-medium text-gray-900 ">Upcoming Events</span></div>
                                <div className="flex flex-row">
                                <span className="inline-flex hover:text-blue-300 hover:cursor-pointer items-center text-xs font-normal text-gray-500">
                                    <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>
                                    Target
                                </span> 
                                <span className="inline-flex ml-3 hover:text-blue-300 hover:cursor-pointer text-xs font-normal text-gray-500">
                                    Posted by:
                                </span>
                                </div>
                                <button className="text-xs font-normal text-start hover:text-blue-300">Replies:</button>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>

        )

}

export default GroupTimeline




    

