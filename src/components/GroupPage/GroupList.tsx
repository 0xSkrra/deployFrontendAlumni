
import React from 'react'
import { getUserGroups } from '../../common/util/API'
import CreateGroupModal from '../CreateModal/CreateGroupModal'
import ListComponent from '../ListView/ListComponent'


const GroupList = () => {
  return (
    <div className='divide-y-2 divide-grey-800 divide-solid'>
      <div>      
      <div className= "mt-3 flex justify-start">
        <div className='w-[53%]'></div>
        <h1 className="text-3xl font-semibold w-[50%] mt-3">Groups</h1>
        <div className="flex justify-start mr-3 mb-3">
          <CreateGroupModal></CreateGroupModal>
        </div>

        </div>    
        </div>
      <ListComponent apiFunction={getUserGroups} />
    </div>
  )
}

export default GroupList