

import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Group } from '../../common/interface/Group'
import { Topic } from '../../common/interface/Topic'
import { addGroupMember, addTopicMember, leaveGroup, leaveTopic } from '../../common/util/API'
import { useUserStore } from '../../common/util/Store/userStore'


const ListRow = (props:any) => {
    const [membership, setMembership] = useState(false)
    const [loadingbutton, setButtonLoading] = useState(false) 
    const userState = useUserStore((state) => state)
    const user = useUserStore((state) => state.User)
    const pathname = window.location.pathname
    const navigate = useNavigate()

    const navigateToProp = () =>
    {
        navigate(pathname + '/' + props.el.id)
    }
    

    const handleClick = () => {
        setButtonLoading(true)
        if (pathname === "/groups" && !loadingbutton){
            const req = addGroupMember(props.el.id)
            const updatedUser = {...user, groups: [...user.groups ,props.el ]}
            userState.setUser(updatedUser)
            req.then(s => s.status<400?setMembership(!membership):setMembership(membership)).finally(() => setButtonLoading(false))
        }

        else if (pathname === `/topics` && !loadingbutton) {
            let req = addTopicMember(props.el.id)
            const updatedUser = {...user, topics: [...user.topics ,props.el ]}
            userState.setUser(updatedUser)
            req.then(s => s.status<400?setMembership(!membership):setMembership(membership)).finally(() => setButtonLoading(false))
        }
        else{
            alert("no action was taken since you're not in a valid spot")
        }
    }

    const handleLeave = async () => {
        setButtonLoading(true)
        if (pathname === "/groups" && !loadingbutton){
            const req = leaveGroup(props.el.id)
            const updatedUser = {...user, groups: userState.User.groups.filter(g => g.id !== props.el.id)}
            userState.setUser(updatedUser)
            req.then(s => s.status<400?setMembership(!membership): setMembership(membership)).finally(() => setButtonLoading(false))
        }
        else if (pathname === `/topics` && !loadingbutton) {
            let req = leaveTopic(props.el.id)
            const updatedUser = {...user, topics: userState.User.topics.filter(t => t.id !== props.el.id)}
            userState.setUser(updatedUser)
            req.then(s => s.status<400?setMembership(!membership):setMembership(membership)).finally(() => setButtonLoading(false))
        }
        else{
            alert("no action was taken since you're not in a valid spot")
        }
    }


    const checkMembership = () => {
        let member: Group|Topic|undefined
        if(pathname === '/groups'){
            member = userState.User.groups.find(x => x.id===props.el.id)
        }
        if(pathname === '/topics'){
            member = userState.User.topics.find(x => x.id===props.el.id)
        }

        if(member !== undefined){
            setMembership(true)            
        }
    }

    if (membership === false){
        checkMembership()
    }

    
    
   return (
            <div className='p-0 w-15 shadow-lg rounded-lg bg-slate-50' >
                <div >
                <div className='border-2 border-gray-100 h-50 rounded-lg hover:bg-slate-300 hover:border-gray-300 hover:cursor-pointer' onClick={navigateToProp}>
                    <div className='list-desc'>
                        <h2 className='font-bold text-xl mb-2 mx-2'>{props.el.title}</h2>
                        {props.el.users.length !== 1 && <p className='text-left justify-start m-2' >{props.el.users.length} members</p>}
                        {props.el.users.length === 1 && <p className='text-left justify-start m-2' >{props.el.users.length} member</p>}
                    </div>
                    <div className='w-30 m-2 overflow-hidden overflow-ellipsis whitespace-prewrap h-12 listrowdescription'
                        >
                        <p className=''>{props.el.body}</p>
                        
                    </div>
                </div>
                    <div className='text-center'>
                        {!membership && 
                        <button disabled={loadingbutton} className=' text-left align-bottom m-2 px-2 py-1 rounded-md hover:bg-slate-300 border-2 border-cyan-700'  
                        onClick={() => {handleClick()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12.5 11.95q.725-.8 1.113-1.825Q14 9.1 14 8t-.387-2.125Q13.225 4.85 12.5 4.05q1.5.2 2.5 1.325T16 8q0 1.5-1 2.625t-2.5 1.325ZM18 20v-3q0-.9-.4-1.712-.4-.813-1.05-1.438 1.275.45 2.363 1.162Q20 15.725 20 17v3Zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2ZM8 12q-1.65 0-2.825-1.175Q4 9.65 4 8q0-1.65 1.175-2.825Q6.35 4 8 4q1.65 0 2.825 1.175Q12 6.35 12 8q0 1.65-1.175 2.825Q9.65 12 8 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q6.35 13 8 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q16 16.35 16 17.2V20Zm8-10q.825 0 1.413-.588Q10 8.825 10 8t-.587-1.412Q8.825 6 8 6q-.825 0-1.412.588Q6 7.175 6 8t.588 1.412Q7.175 10 8 10Zm-6 8h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q9.4 15 8 15t-2.775.337Q3.85 15.675 2.5 16.35q-.225.125-.362.35-.138.225-.138.5ZM8 8Zm0 10Z"/></svg>
                            {!loadingbutton ? <span>Join Community</span> : <span>loading...</span>}
                        </button>}
                        {membership && <button disabled={loadingbutton} className='bg-red-300 text-left align-bottom m-2 px-2 py-1 rounded-md' 
                        onClick={() => {handleLeave()}}>{!loadingbutton ? "Leave Community" : "loading..."}
                        </button>}
                    </div> 

                </div>
            </div>
        )


}




export default ListRow
