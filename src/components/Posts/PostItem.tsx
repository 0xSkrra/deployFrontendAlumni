import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Post } from "../../common/interface/Post"
import { useBoundStore } from "../../common/util/Store/Store"
import RefactorPostModal from "./PostDetailModal"
import dateHandler from "../../common/util/dayjs"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface postItemProps {
  post: Post
}
const PostItem = ({ post }: postItemProps) => {
  const store = useBoundStore((state) => state)
  const navigate = useNavigate()
  const [targetString, setTargetString] = useState<string>("")
  const [targetRedirect, setTargetRedirect] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [expandPost, setExpandPost] = useState<boolean>(false)
  useEffect(() => {
    const getTarget = async () => {
      if (post.groupId !== null) {
        const group = store.Groups.find((g) => g.id === post.groupId)
        if (group !== undefined) {
          setTargetString(`Group/${group.title}`)
          setTargetRedirect(`/groups/${group.id}`)
        }
      } else if (post.topicId !== null) {
        const topic = store.Topics.find((t) => t.id === post.topicId)
        if (topic !== undefined) {
          setTargetString(`Topic/${topic.title}`)
          setTargetRedirect(`/topics/${topic.id}`)
        }
      } else if (post.eventId !== null) {
        const event = store.Events.find((e) => e.id === post.eventId)
        if (event !== undefined) {
          setTargetString(`Event/${event.name}`)
          setTargetRedirect(`/events/${event.id}`)
        }
      }
    }

    getTarget()
  }, [
    post.eventId,
    post.groupId,
    post.receiverId,
    post.topicId,
    store.Events,
    store.Groups,
    store.Topics,
  ])
  const handleOnClickTarget = () => {
    setShowModal(!showModal)
    navigate(targetRedirect)
  }

  return (
    <React.Fragment key={post.id}>
      <ol
        key={post.id}
        className="mt-2 divide-y divider-gray-200 max-h-full max-w-full"
      >
        <li onClick={() => setShowModal(!showModal)}>
          <div className="p-3 hover:cursor-pointer border border-gray-200 max-h-30 rounded-lg sm:flex hoverColorCard shadow-lg bg-slate-50 transition-all duration-200">
            <div className="flex-col rounded">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.src =
                    "\\assets\\default_profile_img.jpg"
                  currentTarget.onerror = null
                }}
                src={
                  post.author
                    ? post.author?.picture !== null
                      ? post.author.picture
                      : "#ERROR"
                    : "#ERROR"
                }
                alt=""
                className=" w-12 h-12 rounded-full mr-3 sm:mb-0"
              />
            </div>

            <div className="flex w-full flex-col text-gray-600">
              <div className="text-base font-normal">
                <span className="font-medium text-gray-900 ">
                  {post.title}
                </span>
              </div>
              <div className="max-w-[3%] mt-1 mb-1">
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    setExpandPost(!expandPost)
                  }}
                  className="text-md max-w-12 flex font-normal text-start hover:text-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrows-angle-expand"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                    />
                  </svg>
                </span>
              </div>

              <div className="flex flex-row w-full">
                <span
                  onClick={() => {
                    handleOnClickTarget()
                  }}
                  className="inline-flex hover:text-blue-300 hover:cursor-pointer items-center text-xs font-normal text-gray-900"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {targetString}
                </span>
                <span className="inline-flex ml-3 text-xs font-normal text-gray-500">
                  Posted by:{" "}
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
                  </span>
                  <span
                    title={dateHandler(post.lastUpdated).toString()}
                    className="inline-flex text-xs font-normal text-gray-500"
                  >
                    {dateHandler(post.lastUpdated).fromNow(true)} ago
                  </span>
                </span>
              </div>

              {expandPost ? (
                <div className="flex h-full w-full items-center justify-center">
                  <ReactMarkdown
                    children={post.body}
                    remarkPlugins={[remarkGfm]}
                    unwrapDisallowed={true}
                    className="min-w-full my-4 text-slate-500 text-lg leading-relaxed prose"
                  />
                </div>
              ) : (
                <></>
              )}
              <button className="text-xs font-normal text-start hover:text-blue-300">
                Replies: {post.replies?.length}
              </button>
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
