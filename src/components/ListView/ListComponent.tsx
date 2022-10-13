

import {useState, useEffect} from 'react'
import PopupView from '../../view/PopupView'
import ListDetail from './ListDetail'
import { getUserTopics } from '../../common/util/API'
import ListRow from './ListRow'
import { IGroup, ITopic } from '../../common/interface/Endpoints'

// no paginations as of yet
const ListComponent = () => {
    const [content, setContent] = useState<React.ReactNode|React.ReactNode[]>(<>Loading...</>)

    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [activeDetail, setActiveDetail] = useState("")
    const handleClickList = (el:any) => {
        setActiveDetail(el)
        console.log(activeDetail);
        console.log(el)
        setShowDetail(true)
    }
    const getListData = async () => {
        console.log("data request...");
        
        const data = await getUserTopics()
        const newContent = data.map((x) => {
            return <ListRow el={x}
            click={handleClickList}
             /> }
            )
        setContent(newContent)
    }
    useEffect(() => {
        getListData()
    }, [])
    
    return (
        <div>
            {content}
            <PopupView clickClose={() => setShowDetail(false)}
                trigger={showDetail} 
                children={<ListDetail item={activeDetail}
                />} 
            />
        </div>
    )
}

export default ListComponent