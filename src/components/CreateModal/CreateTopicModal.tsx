import React, { useState } from "react"
import { addTopic } from "../../common/util/API"
import { Topic } from "../../common/interface/Topic"
import { useUserStore } from "../../common/util/Store/userStore"
import { useBoundStore } from "../../common/util/Store/Store"

export default function CreateTopicModal() {
  const [showModal, setShowModal] = useState(false)
  const [topic, setTopic] = useState<Topic>({
    id: 0,
    title: "",
    body: "",
    posts: [],
    users: [],
    events: [],
  })
  const userState = useUserStore((state) => state)
  const store = useBoundStore((state) => state)

  const postTopic = async () => {
    let req: Topic = await addTopic(topic.title, topic.body)
    userState.setUser({
      ...userState.User,
      topics: [...userState.User.topics, req],
    })
    store.addTopic(req)
    setShowModal(false)
    setTopic((state) => ({
      ...state,
      title: "",
      body: "",
      isPrivate: false,
    }))
  }

  return (
    <>
      <button
        className="px-4 flex py-2 text-black rounded-xl font-medium active:shadow-none active:scale-95  hover:text-white hover:fill-white hover:shadow-xl hoverColor transition-all duration-200 border-2 border-black"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
        >
          <path d="M6 12h12v-2H6Zm0 4h8v-2H6Zm-2 4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8v10q0 .825-.587 1.413Q20.825 20 20 20ZM4 6v12h16V8h-8.825l-2-2H4Zm0 0v12Z" />
        </svg>
        <span className="ml-1">Create Topic</span>
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
                    Create Topic
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
                      setTopic((state) => ({
                        ...state,
                        title: e.target.value,
                      }))
                    }}
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Topic Description
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Topic description..."
                    onChange={(e) => {
                      setTopic((state) => ({
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
                    Create Topic
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
