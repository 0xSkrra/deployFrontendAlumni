

import {useState, useEffect} from 'react'
import PopupView from '../../view/PopupView'
import ListDetail from './ListDetail'
import { getUserGroups, getUserTopics } from '../../common/util/API'
import ListRow from './ListRow'
import { Topic } from '../../common/interface/Topic'
import { Group } from '../../common/interface/Group'
import { Spinner } from '../util/spinner'

interface ListComponentProps{
    apiFunction: () => Group[]|Topic[]

}
// no paginations as of yet
const ListComponent = (props:any) => {
    const [content, setContent] = useState<React.ReactNode|React.ReactNode[]>(<></>)
    const [loading, setLoading] = useState(true)
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
        setLoading(true)
        const data = await props.apiFunction()
        const newContent = data.map((x:Topic|Group) => {
            return <ListRow el={x} key={x.id}
            click={() => {handleClickList(x);handleSetDetail();}}
             /> }
            )
        setLoading(false)
        return setContent(newContent)
    }
    useEffect(() => {
        getListData(props)
    }, [])

    if(loading) return (<div className='h-screen w-screen'> <Spinner /></div>)
    
    return (
        <div>
            <div className='grid grid-flow-rows grid-cols-2 gap-6 mt-5 mx-2 px-1'>
                {content}
            </div>
            
        </div>
    )
}

export default ListComponent
