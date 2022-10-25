
import React from 'react'
import { getUserGroups } from '../../common/util/API'
import CreateGroupModal from '../CreateModal/CreateGroupModal'
import ListComponent from '../ListView/ListComponent'


const GroupList = () => {
  return (
    <div className='backgroundcolorMain'>
      <div>      
      <div className= "pt-3 pb-7 flex justify-start ">
        <div className='w-[45%]'></div>
        <h1 className="text-3xl font-semibold w-[36%] pt-4">Groups</h1>
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