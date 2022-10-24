

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
                <div className='border-2 border-gray-100 h-50 rounded-lg hoverColorCard hover:border-gray-300 hover:cursor-pointer transition-all duration-200' onClick={navigateToProp}>
                    <div className='list-desc'>
                        <h2 className='font-bold text-xl mb-2 mx-2 text-center'>{props.el.title}</h2>
                        <div className='inline-flex ml-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 18v-1.575q0-1.1 1.113-1.763Q2.225 14 4 14q.325 0 .625.012.3.013.575.063-.35.5-.525 1.075-.175.575-.175 1.225V18Zm6 0v-1.625q0-1.625 1.663-2.625 1.662-1 4.337-1 2.7 0 4.35 1 1.65 1 1.65 2.625V18Zm13.5 0v-1.625q0-.65-.163-1.225-.162-.575-.487-1.075.275-.05.563-.063Q19.7 14 20 14q1.8 0 2.9.662 1.1.663 1.1 1.763V18ZM12 14.75q-1.425 0-2.55.375-1.125.375-1.325.875H15.9q-.225-.5-1.338-.875Q13.45 14.75 12 14.75ZM4 13q-.825 0-1.412-.588Q2 11.825 2 11q0-.85.588-1.425Q3.175 9 4 9q.85 0 1.425.575Q6 10.15 6 11q0 .825-.575 1.412Q4.85 13 4 13Zm16 0q-.825 0-1.413-.588Q18 11.825 18 11q0-.85.587-1.425Q19.175 9 20 9q.85 0 1.425.575Q22 10.15 22 11q0 .825-.575 1.412Q20.85 13 20 13Zm-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.138Q10.75 6 12 6q1.275 0 2.137.862Q15 7.725 15 9q0 1.25-.863 2.125Q13.275 12 12 12Zm0-4q-.425 0-.712.287Q11 8.575 11 9t.288.712Q11.575 10 12 10t.713-.288Q13 9.425 13 9t-.287-.713Q12.425 8 12 8Zm0 8Zm0-7Z"/></svg>
                            {props.el.users.length !== 1 && <span className='text-left justify-start ml-2' >{props.el.users.length} members</span>}
                            {props.el.users.length === 1 && <span className='text-left justify-start ml-2' >{props.el.users.length} member</span>}
                        </div>
                    </div>
                    <div className='w-30 m-2 overflow-hidden overflow-ellipsis whitespace-prewrap h-12 listrowdescription'
                        >
                        <p className=''>{props.el.body}</p>
                        
                    </div>
                </div>
                    <div className='text-center'>
                        {!membership && 
                        <button disabled={loadingbutton} className='inline-flex text-left align-bottom m-2 px-5 py-2 rounded-md  border-2 buttonColor text-color border-black hoverColor hover:text-white hover:fill-white'  
                        onClick={() => {handleClick()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q10.4 15 9 15t-2.775.337Q4.85 15.675 3.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q11 8.825 11 8t-.587-1.412Q9.825 6 9 6q-.825 0-1.412.588Q7 7.175 7 8t.588 1.412Q8.175 10 9 10Zm0-2Zm0 10Z"/></svg>                            
                        {!loadingbutton ? <span className='pl-2 font-medium '>Join Community</span> : <span>loading...</span>}
                        </button>}

                        {membership && 
                        <button disabled={loadingbutton} className= 'inline-flex text-left align-bottom m-2 px-5 py-2 rounded-md  border-2 buttonColor2 text-color border-black hoverColor2 hover:text-white hover:fill-white transition-all duration-200' 
                        onClick={() => {handleLeave()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M16 11V9h6v2Zm-7 1q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q10.4 15 9 15t-2.775.337Q4.85 15.675 3.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q11 8.825 11 8t-.587-1.412Q9.825 6 9 6q-.825 0-1.412.588Q7 7.175 7 8t.588 1.412Q8.175 10 9 10Zm0-2Zm0 10Z"/></svg>                            {!loadingbutton ? <span className='pl-2 font-medium '>Leave Community</span> : <span>loading...</span>}
                        </button>}
                    </div> 

                </div>
            </div>
        )


}




export default ListRow
