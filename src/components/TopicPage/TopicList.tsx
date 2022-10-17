import React from 'react'
import { getUserTopics } from '../../common/util/API'
import { useUserStore } from '../../common/util/Store/userStore'
import ListComponent from '../ListView/ListComponent'


const TopicList = () => {
  

  return (
    <div>
        <ListComponent apiFunction={getUserTopics} />
    </div>
  )
}

export default TopicList