import { Dispatch, SetStateAction, useState } from "react"
import { addPost } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"
import { Post } from "../../common/interface/Post"
import { useBoundStore } from "../../common/util/Store/Store"
import { Paginate } from "../../common/interface/pagination"

interface CreatePostProps {
  id: number
  target: string
  posts: Post[]
  setPosts: Dispatch<SetStateAction<Post[]>>
  pagination?: Paginate
  setPagination?: Dispatch<SetStateAction<Paginate>>
}
export default function CreatePostModal({
  id,
  target,
  posts,
  setPosts,
  pagination,
  setPagination,
}: CreatePostProps) {
  const [showModal, setShowModal] = useState(false)
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    lastUpdated: "",
    author: undefined,
    parentId: undefined,
    replies: undefined,
    receiverId: undefined,
    topicId: undefined,
    groupId: undefined,
    eventId: undefined,
  })
  const userState = useUserStore((state) => state)
  const store = useBoundStore()

  const postTopic = async () => {
    if (target === "topic") {
      post.topicId = id
      const req: Post = await addPost(
        post.title,
        post.body,
        post.topicId,
        post.eventId,
        post.groupId
      ) // Add target
      userState.setUser({
        ...userState.User,
        authoredPosts: [...userState.User.authoredPosts, req],
      })
      store.addPostToTopic(req)
      setPosts((state) =>
        state.length === 6
          ? [...state.slice(0, 5), req]
          : [...state, req]
      )
      if (setPagination)
        setPagination((state) => ({
          ...state,
          ElementCount: state.ElementCount,
        }))
    } else if (target === "group") {
      post.groupId = id
      const req: Post = await addPost(
        post.title,
        post.body,
        post.topicId,
        post.eventId,
        post.groupId
      ) // Add target
      userState.setUser({
        ...userState.User,
        authoredPosts: [...userState.User.authoredPosts, req],
      })
      store.addPostToGroup(req)
      setPosts((state) =>
        state.length === 6
          ? [...state.slice(0, 5), req]
          : [...state, req]
      )
      if (setPagination)
        setPagination((state) => ({
          ...state,
          ElementCount: state.ElementCount + 1,
        }))
    } else if (target === "event") {
      post.eventId = id
      const req: Post = await addPost(
        post.title,
        post.body,
        post.topicId,
        post.eventId,
        post.groupId
      ) // Add target
      userState.setUser({
        ...userState.User,
        authoredPosts: [...userState.User.authoredPosts, req],
      })
      store.addPostToEvent(req)
      setPosts((state) =>
        state.length === 6
          ? [...state.slice(0, 5), req]
          : [...state, req]
      )
      if (setPagination)
        setPagination((state) => ({
          ...state,
          ElementCount:
            state.ElementCount < 6
              ? state.ElementCount + 1
              : state.ElementCount,
        }))
    }
    setShowModal(false)
    setPost((state) => ({ ...state, title: "", body: "" }))
  }

  return (
    <>
      <button
        className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Post
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Post
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="bg-white-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-1">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    onChange={(e) => {
                      setPost((state) => ({
                        ...state,
                        title: e.target.value,
                      }))
                    }}
                  />
                  <label className="block text-black text-sm font-bold mb-1 mt-2">
                    Content
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Content..."
                    onChange={(e) => {
                      setPost((state) => ({
                        ...state,
                        body: e.target.value,
                      }))
                    }}
                  />
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => postTopic()}
                  >
                    Create Post
                  </button>
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
