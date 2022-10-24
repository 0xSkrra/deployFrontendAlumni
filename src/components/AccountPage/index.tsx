import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultUserProfile, UserProfile } from "../../common/interface/UserProfile"
import { getUserById } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"

const AccountPage = () => {
    const [user, setUser] = useState<UserProfile>(defaultUserProfile)
    const userState = useUserStore((state) => state)
    const {id} = useParams()

    useEffect(() => {
        if(id !== undefined) getUserById(+id!).then((u) => setUser(u))
        else{
            setUser(userState.User)
        }
    }, [id, userState.User])
    
  return (
    <div className=" h-6/6 flex flex-row rounded-lg ">    
    <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6 min-w-lg">
        <div className="flex flex-wrap justify-center">
            <div className="flex  w-full justify-center items-center">
            <div className="relative flex">
                <img onError={({currentTarget}) => {
                                currentTarget.src ="\\assets\\default_profile_img.jpg"
                                currentTarget.onerror = null }}
                                src={user ? user.picture !== null ? user.picture : '#ERROR' : '#ERROR'}
                                alt=""
                    className="shadow-xl rounded-full w-32 md:w-40 lg:w-48  border-none"/>
            </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
            <div className="flex justify-center">
                <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.authoredPosts.length}
                </span>
                <span className="text-sm text-blueGray-400">Posts</span>
                </div>
                <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.authoredEvents.length + user.respondedEvents.length}
                </span>
                <span className="text-sm text-blueGray-400">Events</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.topics.length}
                </span>
                <span className="text-sm text-blueGray-400">Topics</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.groups.length}
                </span>
                <span className="text-sm text-blueGray-400">Groups</span>
                </div>
            </div>
            </div>
        </div>
        <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
            {user.username}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
            {user.status}
            </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {user.bio}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default AccountPage
