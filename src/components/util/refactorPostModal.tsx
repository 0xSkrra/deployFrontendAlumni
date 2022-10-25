import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"
import remarkGfm from "remark-gfm"
import { Post } from "../../common/interface/Post"
import { addCommentToPost } from "../../common/util/API"
import dateHandler from "../../common/util/dayjs"
import Comments from "./comment"
import { NewCommentSpinner } from "./spinner"
interface props {
  showModal: boolean
  setShowModal: () => void
  post: Post
  targetString: string
  targetOnClick: () => void
}
export default function CreatePostModal({
  showModal,
  setShowModal,
  post,
  targetOnClick,
  targetString,
}: props) {
  const navigate = useNavigate()
  const [newPostComment, setNewPostComment] = useState("")
  const [comments, setComments] = useState(post.replies!)
  const [loading, setLoading] = useState(false)
  const onSubmitkNewComment = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setLoading(true)
    e.preventDefault()
    if (newPostComment.length < 1) return
    const newComment = await addCommentToPost(
      post.id,
      newPostComment
    ).finally(() => {
      setComments((state) => [...state, newComment])
      setNewPostComment("")
      setLoading(false)
    })
  }
  return (
    <>
      {showModal ? (
        <>
          <div
            onClick={() => {
              setShowModal()
            }}
            className="flex  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 backdrop-brightness-50 focus:outline-none"
          >
            <div
              onClick={(e) => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation()
              }}
              className="modal-overlay absolute w-[60%] drop-shadow-sm opacity-100 h-full bg-white"
            >
              {/*content*/}
              <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-solid border-slate-200 rounded-t">
                  <div className="flex flex-col">
                    <span className="inline-flex text-xs font-normal text-gray-600">
                      <span
                        onClick={targetOnClick}
                        className="inline-flex mr-1 hover:text-blue-300 hover:cursor-pointer text-xs font-normal text-gray-900"
                      >
                        {targetString}{" "}
                      </span>
                      * Posted by:{" "}
                      <span
                        onClick={() =>
                          navigate(
                            `/account/${
                              post.author !== undefined
                                ? post.author.id
                                : -1
                            }`
                          )
                        }
                        className="inline-flex ml-1 mr-1 hover:text-blue-300 hover:cursor-pointer text-xs font-normal text-gray-900"
                      >
                        {post.author?.username}
                      </span>{" "}
                      on {dateHandler(post.lastUpdated).toString()}
                    </span>
                    <h3 className="text-3xl mt-1 inline-flex font-semibold">
                      {post.title}
                    </h3>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={setShowModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="close">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            />
                            <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative min-h-full p-6 flex-auto">
                  <>
                    <ReactMarkdown
                      children={post.body}
                      remarkPlugins={[remarkGfm]}
                      unwrapDisallowed={true}
                      className="min-w-full my-4 text-slate-500 text-lg leading-relaxed prose"
                    />
                  </>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center overflow-x-hidden p-6 border-t border-solid border-slate-200 rounded-b">
                  <div className="w-[75%] px-3 mb-2 mt-2">
                    <div className="mb-4 w-full flex-col bg-white">
                      <Comments
                        comments={comments}
                        setComments={setComments}
                        setReplyComment={setNewPostComment}
                      />
                    </div>
                    <form onSubmit={(e) => onSubmitkNewComment(e)}>
                      <div className="mb-4 w-full bg-white rounded-lg border-2 border-gray-300 ">
                        <div className="py-2 px-4 bg-white rounded-t-lg ">
                          <label
                            htmlFor="comment"
                            className="sr-only"
                          >
                            Your comment
                          </label>
                          <textarea
                            onChange={(e) => {
                              e.preventDefault()
                              setNewPostComment(e.target.value)
                            }}
                            id="comment"
                            value={newPostComment}
                            rows={4}
                            className="p-2  outline-0 border-b border-gray-200  w-full text-sm text-gray-900 bg-white"
                            placeholder="Write a comment..."
                            required
                          ></textarea>
                        </div>

                        <div className="flex justify-between items-center py-2 px-3 ">
                          {loading ? (
                            <NewCommentSpinner />
                          ) : (
                            <button
                              type="submit"
                              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                            >
                              Post comment
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
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
