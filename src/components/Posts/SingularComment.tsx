import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"
import remarkGfm from "remark-gfm"
import { Post } from "../../common/interface/Post"
import { getUserById, putComment } from "../../common/util/API"
import dateHandler from "../../common/util/dayjs"
import { useUserStore } from "../../common/util/Store/userStore"
import { NewCommentSpinner } from "../util/spinner"

interface commentProps {
  comment: Post
  setComments: React.Dispatch<React.SetStateAction<Post[]>>
  setReplyComment: React.Dispatch<React.SetStateAction<string>>
}

const SingularComment = ({
  comment,
  setComments,
  setReplyComment,
}: commentProps) => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.User)
  const [editCommentVisible, setEditCommentVisible] = useState(false)
  const [editComment, setEditComment] = useState<Post>(comment)
  const [loading, setLoading] = useState(false)

  if (!comment.author && comment.authorId) {
    getUserById(comment.authorId).then((r) => {
      setComments((state) =>
        state.map((x) =>
          x.id === comment.id ? { ...x, author: r } : x
        )
      )
    })
  }
  const CommentReply = `### ${
    comment.author ? comment.author.username : "#Error"
  } on ${dateHandler(comment.lastUpdated).toString()}
  >${comment.body} 
  
  
  `

  const onSubmitEditComment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setEditCommentVisible(false)
    setLoading(true)

    // do stuff
    const newComment: boolean | void = await putComment(editComment)
      .then((r) => r)
      .catch((e) => console.log(e))

    if (newComment)
      setComments((state) =>
        state.map((x) => (x.id === editComment.id ? editComment : x))
      )
    setLoading(false)
  }

  return (
    <div className="flex">
      {/* PARENT COMMENT */}
      <div className="flex border border-gray-400 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed w-full">
        <div className="flex-row sm:min-w-[5%] md:min-w-[7%] lg:min-w-[3%] mr-2">
          <img
            className="w-full sm:min-w-[5%] md:min-w-[7%] lg:min-w-[3%]  rounded-full w-8 h-8 sm:w-10 sm:h-10"
            onError={({ currentTarget }) => {
              currentTarget.src = "\\assets\\default_profile_img.jpg"
              currentTarget.onerror = null
            }}
            src={
              comment.author
                ? comment.author.picture !== null
                  ? comment.author.picture
                  : "#ERROR"
                : "#ERROR"
            }
            alt=""
          />
        </div>
        <div className="flex-row w-full">
          <div className="flex-row w-full">
            <div className="flex w-full">
              <div className="">
                <strong
                  className="hover:cursor-pointer hover:text-blue-300 text-blue-900"
                  onClick={() =>
                    navigate(`/account/${comment.author?.id}`)
                  }
                >
                  {comment.author
                    ? comment.author.username
                    : "#Error"}
                </strong>{" "}
                <span
                  title={dateHandler(comment.lastUpdated).toString()}
                  className="text-xs text-gray-400"
                >
                  {dateHandler(comment.lastUpdated).fromNow(true)} ago
                </span>
              </div>
              <div className="max-w-1 ml-80">
                {comment.author && comment.author.id === user.id ? (
                  <div className="">
                    <h1
                      onClick={() => {
                        setEditCommentVisible(!editCommentVisible)
                        setEditComment((state) => ({
                          ...state,
                          body: comment.body,
                        }))
                      }}
                      className="text-xs text-blue-500 hover:cursor-pointer hover:text-blue-300"
                    >
                      {editCommentVisible ? "close" : "edit"}
                    </h1>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <>
            {!editCommentVisible ? (
              <ReactMarkdown
                children={comment.body}
                remarkPlugins={[remarkGfm]}
                className="min-w-full prose"
              />
            ) : (
              <form onSubmit={onSubmitEditComment}>
                <div className="py-2 px-4 bg-white rounded-t-lg ">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    onChange={(e) => {
                      e.preventDefault()
                      setEditComment((state) => ({
                        ...state,
                        body: e.target.value,
                      }))
                    }}
                    id="comment"
                    defaultValue={comment.body}
                    rows={4}
                    className="p-2  outline-0 border-b border-gray-200  w-full text-sm text-gray-900 bg-white"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                  <div className="flex justify-between items-center py-2 px-3 ">
                    {loading ? (
                      <NewCommentSpinner />
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="inline-flex py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            )}
          </>

          {/* Child COMMENTS GO */}
          <div className="-ml-12">
            {/* {replies} */}
            <span
              onClick={() => setReplyComment(CommentReply)}
              className="text-xs text-blue-500 hover:cursor-pointer hover:text-blue-300"
            >
              Reply
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingularComment
