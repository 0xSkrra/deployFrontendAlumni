
import React from 'react'
import { getUserGroups } from '../../common/util/API'
import CreateGroupModal from '../CreateModal/CreateGroupModal'
import ListComponent from '../ListView/ListComponent'


const GroupList = () => {
  return (
    <div className='divide-y-2 divide-grey-800 divide-solid backgroundcolor3'>
      <div>      
      <div className= "pt-3 pb-7 flex justify-start backgroundColor ">
        <div className='w-[46%]'></div>
        <h1 className="text-3xl font-semibold w-[38%] pt-4">Groups</h1>
        <div className="flex justify-start mr-3 mt-4">
          <CreateGroupModal></CreateGroupModal>
        </div>

        </div>    
        </div>
      <ListComponent apiFunction={getUserGroups} />
    </div>
  )
}

export default GroupList