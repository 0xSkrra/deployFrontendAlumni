import React, { ReactNode, useEffect, useState } from "react"
import { Post } from "../../common/interface/Post"
import { addCommentToPost } from "../../common/util/API"
import Comments from "./comment"

interface PostModalProps{
    postToDisplay: Post
    removeModalMethod: () => void
}

const PostModal = ({postToDisplay, removeModalMethod}: PostModalProps) => {
  const [newPostComment, setNewPostComment] = useState("")
  const [comments, setComments] = useState(postToDisplay.replies!)
  const onSubmitkNewComment = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if(newPostComment.length < 1) return
    const newComment = await addCommentToPost(postToDisplay.id ,newPostComment)
    setComments((state) => [...state, newComment])
    setNewPostComment("")
  }
  return (
    <div className="absolute transition bg-gray-100 ease-in-out delay-150 h-screen duration-300 top-0 left-[25%] bottom-0 w-full max-w-[53%] py-50 shadow-md overflow-x-hidden overflow-y-auto"
                id="exampleModalFullscreen"  aria-labelledby="exampleModalFullscreenLabel">
                <div className="modal-dialog min-h-[100%] modal-fullscreen  relative w-auto pointer-events-none">
                    <div
                    className="modal-content border-l border-r bg-gray-100 h-screen relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalFullscreenLabel">
                        {postToDisplay.title}
                        </h5>
                        <button type="button"
                        onClick={removeModalMethod}
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        >X</button>
                    </div>
                    <div className="modal-body relative p-4">
                        {postToDisplay.body}
                    </div> 
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
                    <div className="w-[75%] px-3 mb-2 mt-2">
                    <div className="mb-4 w-full flex flex-col bg-gray-100">
                            <Comments comments={comments}/>
                        </div>
                        <form onSubmit={(e) => onSubmitkNewComment(e)}>
                            <div className="mb-4 w-full bg-gray-100 rounded-lg border-2 border-gray-300">
                                <div className="py-2 px-4 bg-gray-100 rounded-t-lg ">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea onChange={(e) => {
                                        e.preventDefault()
                                        setNewPostComment(e.target.value)
                                    }} id="comment" value={newPostComment} rows={4} className="p-2  outline-0 border-b border-gray-200  w-full text-sm text-gray-900 bg-gray-100" placeholder="Write a comment..." required></textarea>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 ">
                                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                                        Post comment
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default PostModal