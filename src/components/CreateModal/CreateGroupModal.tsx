import React, {useState} from "react";
import { Group } from "../../common/interface/Group"
import { addGroup } from "../../common/util/API"
import { useBoundStore } from "../../common/util/Store/Store";
import { useUserStore } from "../../common/util/Store/userStore";


export default function CreateGroupModal() {

    const [showModal, setShowModal] = useState(false);
    const [group, setGroup] = useState<Group>({id: 0, title: "", body: "", isPrivate: false, posts: [], users: [], events: []})
    const userState = useUserStore((state) => state)
    const store = useBoundStore((state) => state)

    const postGroup = async () => {
        let req: Group = await addGroup(group.title, group.body!, group.isPrivate)
        userState.setUser({...userState.User, groups: [...userState.User.groups, req]})
        store.addGroup(req)
        setShowModal(false);
        setGroup((state) => ({...state, title: "", body: "", isPrivate: false}))
    }

    return (
      <>
        <button
          className="px-4 flex py-2 text-black rounded-xl font-medium active:shadow-none active:scale-95 hover:bg-purple-900 hover:text-white hover:fill-white hover:shadow-xl hover:shadow-purple-800 disabled:bg-gray-400/80  transition-all border-2 border-black"
          type="button"
          onClick={() => setShowModal(true)}
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12.5 11.95q.725-.8 1.113-1.825Q14 9.1 14 8t-.387-2.125Q13.225 4.85 12.5 4.05q1.5.2 2.5 1.325T16 8q0 1.5-1 2.625t-2.5 1.325ZM18 20v-3q0-.9-.4-1.712-.4-.813-1.05-1.438 1.275.45 2.363 1.162Q20 15.725 20 17v3Zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2ZM8 12q-1.65 0-2.825-1.175Q4 9.65 4 8q0-1.65 1.175-2.825Q6.35 4 8 4q1.65 0 2.825 1.175Q12 6.35 12 8q0 1.65-1.175 2.825Q9.65 12 8 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q6.35 13 8 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q16 16.35 16 17.2V20Zm8-10q.825 0 1.413-.588Q10 8.825 10 8t-.587-1.412Q8.825 6 8 6q-.825 0-1.412.588Q6 7.175 6 8t.588 1.412Q7.175 10 8 10Zm-6 8h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q9.4 15 8 15t-2.775.337Q3.85 15.675 2.5 16.35q-.225.125-.362.35-.138.225-.138.5ZM8 8Zm0 10Z"/></svg>          
        <span className="ml-1"> Create Group</span>  
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
                      className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-indigo-500 text-white hover:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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