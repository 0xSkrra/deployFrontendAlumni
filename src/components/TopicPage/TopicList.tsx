import React from 'react'
import { getUserTopics } from '../../common/util/API'
import { useUserStore } from '../../common/util/Store/userStore'
import CreateTopicModal from '../CreateModal/CreateTopicModal'
import ListComponent from '../ListView/ListComponent'


const TopicList = () => {
  

  return (
    <div className='divide-y-2 divide-grey-800 divide-solid'>
    <div>      
    <div className= "mt-3 flex justify-start">
      <div className='w-[53%]'></div>
      <h1 className="text-3xl font-semibold w-[50%] mt-3">Topics</h1>
      <div className="flex justify-start mr-3 mb-3">
        <CreateTopicModal/>
      </div>

      </div>    
      </div>
      <ListComponent apiFunction={getUserTopics} />
  </div>

  )
}

export default TopicList