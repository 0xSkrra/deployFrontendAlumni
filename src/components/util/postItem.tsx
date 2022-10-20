import { format } from 'path'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Group } from '../../common/interface/Group'
import { Post } from '../../common/interface/Post'
import { Topic } from '../../common/interface/Topic'
import { Event } from '../../common/interface/Event'
import { defaultUserProfile, UserProfile } from '../../common/interface/UserProfile'
import { getUserById } from '../../common/util/API'
import { useBoundStore } from '../../common/util/Store/Store'
import RefactorPostModal from './refactorPostModal'
interface postItemProps{
    post: Post
    onClickPost: () => void
}
const PostItem = ({post, onClickPost}: postItemProps) => {
    const store = useBoundStore((state)=> state) 
    const navigate = useNavigate()
    const [targetString, setTargetString] = useState<string>('')
    const [targetRedirect, setTargetRedirect] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)

    const date = post.lastUpdated.replace('T',' ').split('.')[0]
    useEffect(() => {
        const getTarget = async () => {
        if(post.groupId !== null){
            const group = store.Groups.find((g) => g.id === post.groupId)
            if(group !== undefined){
                setTargetString(`Group/${group.title}`)
                setTargetRedirect(`/groups/${group.id}`)
            }
        }else if( post.topicId !== null){
            const topic = store.Topics.find((t) => t.id === post.topicId)
            if(topic !== undefined){
                setTargetString(`Topic/${topic.title}`)
                setTargetRedirect(`/topics/${topic.id}`)
            }
        }else if( post.eventId !== null){
            const event = store.Events.find((e) => e.id === post.eventId)
            if(event !== undefined){
                setTargetString(`Event/${event.name}`)
                setTargetRedirect('/event')
            }
        }else if( post.receiverId !== null && post.receiverId !== undefined){
            const user = (await getUserById(post.receiverId))
            if(user !== undefined){
                setTargetString(`User/${user.username}`)
                setTargetRedirect(`/account/${user.id}`)
            }
        }
    }
    getTarget()
    }, [post.eventId, post.groupId, post.receiverId, post.topicId, store.Events, store.Groups, store.Topics])
    const handleOnClickTarget = () => {
        setShowModal(!showModal)
        navigate(targetRedirect)
    }
    let pic=post.author?.picture
    if(pic===null) pic = "\\assets\\default_profile_img.jpg"

    return (
        <React.Fragment key={post.id}>
            <ol key={post.id} className="mt-2 divide-y divider-gray-200 max-h-full max-w-full">
                        <li onClick={() => setShowModal(!showModal)} >
                            <div  className=" p-3 hover:cursor-pointer border border-gray-200 max-h-30 rounded-lg sm:flex hover:bg-gray-100 shadow-lg bg-slate-50">
                                <div className="flex-col rounded">                
                                <img className=" w-12 h-12 rounded-full mr-3 sm:mb-0" src={pic} alt=""/>
                                </div>
                                
                                <div className="flex flex-col text-gray-600">
                                    <div className="text-base font-normal"><span className="font-medium text-gray-900 ">{post.title}</span></div>
                                    <div className="flex flex-row">
                                    <span 
                                    onClick={() => {handleOnClickTarget()}}
                                    className="inline-flex hover:text-blue-300 hover:cursor-pointer items-center text-xs font-normal text-gray-900">
                                        <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>
                                        {targetString}
                                    </span> 
                                    <span className="inline-flex ml-3 text-xs font-normal text-gray-500">
                                        Posted by: <span onClick={() => navigate(`/account/${ post.author !== undefined ? post.author.id : -1}`)} className="inline-flex ml-1 mr-1 hover:text-blue-300 hover:cursor-pointer text-xs font-normal text-gray-900" >{post.author?.username}</span> on {date}
                                    </span>
                                    </div>
                                    <button className="text-xs font-normal text-start hover:text-blue-300">Replies: {post.replies?.length}</button>
                                </div>
                            </div>
                        </li>
                    </ol>

                    <RefactorPostModal 
                    showModal={showModal} 
                    setShowModal={() => setShowModal(!showModal)}
                    post={post}
                    targetString={targetString}
                    targetOnClick={handleOnClickTarget}
                    />
            </React.Fragment>
  )
}

export default PostItem