import React from 'react'
import { getUserTopics } from '../../common/util/API'
import ListComponent from '../ListView/ListComponent'


const TopicList = () => {
  return (
    <div>
        <ListComponent apiFunction={getUserTopics} />
    </div>
  )
}

export default TopicList