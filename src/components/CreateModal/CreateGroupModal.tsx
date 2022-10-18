import React, {useState} from "react";
import { Group } from "../../common/interface/Group"
import { addGroup } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore";


export default function CreateGroupModal() {

    const [showModal, setShowModal] = useState(false);
    const [group, setGroup] = useState<Group>({id: 0, title: "", body: "", isPrivate: false, posts: [], users: [], events: []})
    const userState = useUserStore((state) => state)

    const postGroup = async () => {
        let req: Group = await addGroup(group.title, group.body!, group.isPrivate)
        userState.User.groups.push(req);
        setShowModal(false);
        setGroup((state) => ({...state, title: "", body: "", isPrivate: false}))
    }

    return (
      <>
        <button
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Create Group
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Create Group
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
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange={(e) => 
                    {
                        setGroup((state) => ({...state, title: e.target.value}))}} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Group Description</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Group description..."
                    onChange={(e) => 
                        {
                            setGroup((state) => ({...state, body: e.target.value}))}} />
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Private</span>
                    <label htmlFor="private-toggle" className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" value="" id="private-toggle" className="sr-only peer" onChange={(e) => 
                    {
                        setGroup((state) => ({...state, isPrivate: e.target.checked}))}} 
                        />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </form>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => postGroup()}
                    >
                      Create Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }