
import React from 'react'
import { getUserGroups } from '../../common/util/API'
import ListComponent from '../ListView/ListComponent'


const GroupList = () => {
  return (
    <div>
        <ListComponent apiFunction={getUserGroups} />
    </div>
  )
}

export default GroupList