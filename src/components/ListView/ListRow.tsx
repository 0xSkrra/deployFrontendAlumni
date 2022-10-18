

import { group } from 'console'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Group } from '../../common/interface/Group'
import { Topic } from '../../common/interface/Topic'
import { addGroupMember, addTopicMember, getUserGroups, getUserTopics, leaveGroup, leaveTopic } from '../../common/util/API'
import { useUserStore } from '../../common/util/Store/userStore'

interface ListRowProps {
    elem: Group|Topic
}

const ListRow = (props:any) => {
    const [hover, setHover] = useState(false) // for conditionally viewed desc
    const [membership, setMembership] = useState(false)
    const userState = useUserStore((state) => state)
    const pathname = window.location.pathname
    const navigate = useNavigate()

    const navigateToProp = () =>
    {
        console.log(pathname)
        navigate(pathname + '/' + props.el.id)
    }
    

    const handleClick = () => {
         
        if (pathname === "/groups"){
            const req = addGroupMember(props.el.id)
            userState.User.groups = [...userState.User.groups, props.el]
            const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership))   
        }

        else if (pathname === `/topics`) {
            let req = addTopicMember(props.el.id)
            userState.User.topics = [...userState.User.topics, props.el]   
            const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership))
        }
        else{
            alert("no action was taken since you're not in a valid spot")
        }
    }

    const handleLeave = () => {
        if (pathname === "/groups"){
            const req = leaveGroup(props.el.id)
            userState.User.groups = userState.User.groups.filter(g => g.id !== props.el.id)
            const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership))
        }
        else if (pathname === `/topics`) {
            let req = leaveTopic(props.el.id)
            userState.User.topics = [...userState.User.topics, props.el] 
            const promise = req.then(s => s.status<400?setMembership(!membership):setMembership(membership))
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
            <div className='p-0 w-15 shadow-xl' onClick={navigateToProp} >
                <div className='border-2 border-gray-50 h-50'>
                    <div className='list-desc bg-slate-200'>
                        <h2 className='font-bold text-xl mb-2 mx-2'>{props.el.title}</h2>
                        <p className='text-left justify-start m-2' >{props.el.users.length} members</p>
                    </div>
                    <div className='w-30 m-2 overflow-hidden overflow-ellipsis whitespace-prewrap h-12 listrowdescription'>
                        <p className=''>{props.el.body}</p>
                        
                    </div>
                    <div>
                        {!membership && <button className='bg-blue-300 text-left justify-end align-bottom m-2 px-2 py-1 rounded-md' onClick={() => handleClick()}>Join Community</button>}
                        {membership && <button className='bg-red-300 text-left justify-end align-bottom m-2 px-2 py-1 rounded-md' onClick={() => handleLeave()}>Leave Community</button>}
                    </div>
                </div>
            </div>
        )

}

export default ListRow
