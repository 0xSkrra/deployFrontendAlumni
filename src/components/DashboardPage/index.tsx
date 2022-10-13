import { useKeycloak } from "@react-keycloak/web"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Post } from "../../common/interface/Post"
import { getAllPosts } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"

const DashboardPage = () => {
    const [posts, setPosts] = useState<React.ReactNode|React.ReactNode[]>(<></>)
    const [childPosts, setChildPosts] = useState<React.ReactNode|React.ReactNode[]>(<></>)
    const userState = useUserStore((state) => state)
    const {keycloak} = useKeycloak()
    const navigate = useNavigate()
    const fetchAndCreatePosts = async () => {
        const relatedPosts: Post[] = await getAllPosts().then(
            r => r
        )
        // save posts to store here... create post store first...
        //

        // map posts received, to child(replies) posts or parent posts
        // perhaps order post children from newest to oldest before saving to state
        // const postChildren  = Array.from(relatedPosts, p => p.parentId !== undefined)

        const newPosts = relatedPosts.map((x) => {
            return x.parentId === null ?  (
            <ol key={x.id.toString()} className="mt-3 divide-y divider-gray-200 max-w-[70%]">
                <li>
                    <div className=" p-3 border border-gray-300 max-h-20 rounded-lg sm:flex hover:bg-gray-100">
                        <div className="flex-col rounded">                
                        <img className=" w-12 h-12 rounded-full mr-3 sm:mb-0" src={x.author?.picture} alt=""/>
                        </div>
                        
                        <div className="flex flex-col text-gray-600">
                            <div className="text-base font-normal"><span className="font-medium text-gray-900 ">{x.title}</span></div>
                            <div className="flex flex-row">
                            <span className="inline-flex hover:text-blue-300 hover:cursor-pointer items-center text-xs font-normal text-gray-500">
                                <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>
                                {typeof x.target}
                            </span> 
                            <span className="inline-flex ml-3 hover:text-blue-300 hover:cursor-pointer text-xs font-normal text-gray-500">
                                Posted by: {x.author?.username} on {x.lastUpdated}
                            </span>
                            </div>
                            <button className="text-xs font-normal text-start hover:text-blue-300">Replies: {x.replies?.length}</button>
                        </div>
                    </div>
                </li>
            </ol>
            )
            : <React.Fragment key={x.id}></React.Fragment>
        })

        // save states
        setPosts(newPosts)
        //setChildPosts(postChildren)
    }
    useEffect(() => {
        fetchAndCreatePosts()
    }, [])

    const onClickPost = (id: number) => {

    }
    
  return (
    <div className="p-5 mb-4 rounded-lg ">
    {posts}
    {/*
    PLACE UPCOMING EVENTS HERE
    */}
</div>
  )
}

export default DashboardPage