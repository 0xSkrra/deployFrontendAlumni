

import {useState, useEffect} from 'react'
import PopupView from '../../view/PopupView'
import ListDetail from './ListDetail'
import { getUserGroups, getUserTopics } from '../../common/util/API'
import ListRow from './ListRow'
import { Topic } from '../../common/interface/Topic'
import { Group } from '../../common/interface/Group'

interface ListComponentProps{
    apiFunction: () => Group[]|Topic[]

}
// no paginations as of yet
const ListComponent = (props:any) => {
    const [content, setContent] = useState<React.ReactNode|React.ReactNode[]>(<>Loading...</>)

    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [activeDetail, setActiveDetail] = useState<Topic|Group>()
    const handleClickList = (el:Topic|Group) => {
        setActiveDetail(el)
    }
    const handleSetDetail = () =>
    {
        setShowDetail(true)
    }
    const getListData = async (props:any) => {
        
        const data = await props.apiFunction()
        const newContent = data.map((x:Topic|Group) => {
            return <ListRow el={x} key={x.id}
            click={() => {handleClickList(x);handleSetDetail();}}
             /> }
            )
        return setContent(newContent)
    }
    useEffect(() => {
        getListData(props)
    }, [])
    
    return (
        <div>
            <div className='grid grid-flow-rows grid-cols-2 gap-6 mt-2 mx-2 px-1'>
                {content}
            </div>
            
        </div>
    )
}

export default ListComponent
