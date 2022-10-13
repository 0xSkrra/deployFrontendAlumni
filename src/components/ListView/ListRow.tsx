

import { useState } from 'react'

const ListRow = (props:any) => {
    const [hover, setHover] = useState(false) // for conditionally viewed desc



    return (
            <div className='p-0.5 w-50' onClick={props.click} >
                <div className='border-2 border-gray-50 text-center'
                >
                    <div className='list-desc'>
                    {props.el.title}
                    </div>
                    { hover &&
                    <div className=' w-100vw'>
                    {props.el.body}
                  </div> }
                </div>
            </div>
        )
}

export default ListRow