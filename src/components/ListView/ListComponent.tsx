

import {useState, useEffect} from 'react'
import PopupView from '../../view/PopupView'
import {topics} from './api-values'
import ListDetail from './ListDetail'

// no paginations as of yet
const ListComponent = () => {
    const [hover, setHover] = useState(false)
    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [activeDetail, setActiveDetail] = useState("")
    const handleClickList = (el:any) => {
        setActiveDetail(el)
        console.log(activeDetail);
        console.log(el)
        setShowDetail(true)
    }
    
    
        // maybe add a hideDesc button if it's so important to widdle me
    const listElements = topics.map(topics => {
        
        return (
            <div className='p-0.5 w-50'
            
                onClick={() => handleClickList(topics) }>
                <div className='border-2 border-gray-50 text-center'>
                    <div className='list-desc'>
                    {topics.name}
                    </div>
                    { hover &&
                    <div className=' w-100vw'>
                    {topics.description}
                  </div> }
                </div>
            </div>
        )
    })

    return (
        <div>
            {listElements}
            <PopupView clickClose={() => setShowDetail(false)}
                trigger={showDetail} 
                children={<ListDetail item={activeDetail}
                />} 
            />
        </div>
    )
}

export default ListComponent