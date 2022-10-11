import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { defaultUserProfile, UserProfile } from "../../common/interface/UserProfile"
import { getUserById } from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"

interface props{
    userId?: number
}

const AccountPage = () => {
    const [user, setUser] = useState<UserProfile>(defaultUserProfile)
    const {id} = useParams()

    useEffect(() => {
        if(id !== undefined) getUserById(+id!).then((u) => setUser(u))
        else{
            setUser(useUserStore.getState().User)
        }
    }, [id])
    
  return (
    <div className="md:min-w-[85%] md:min-h-[85%] w-full mt-2 lg:w-4/12 px-4 mx-auto">
    <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6 min-w-lg">
        <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
            <div className="relative">
                <img onError={({currentTarget}) => {
                    currentTarget.src ="https://cdn-icons-png.flaticon.com/512/892/892694.png"
                    currentTarget.onerror = null }}
                    alt="..." src="https://cdn-icons-png.flaticon.com/512/892/892694.png" 
                    className="shadow-xl rounded-full w-32 md:w-48 lg:w-96  border-none -m-12 -ml-20 lg:-ml-16"/>
            </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.authoredEvents.length + user.respondedEvents.length}
                </span>
                <span className="text-sm text-blueGray-400">Events</span>
                </div>
                <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.authoredPosts.length}
                </span>
                <span className="text-sm text-blueGray-400">Posts</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {user.topics.length}
                </span>
                <span className="text-sm text-blueGray-400">Topics</span>
                </div>
            </div>
            </div>
        </div>
        <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {user.username}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
            {user.status}
            </div>
{/*             <div className="mb-2 text-blueGray-600 mt-10">
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
            University of Computer Science
            </div> */}
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
