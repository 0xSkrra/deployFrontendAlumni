import { Group } from '../../common/interface/Group'
import { Topic } from '../../common/interface/Topic'

interface ListDetailProps {
  title:string,
  body:string,
}

const ListDetail = ({title, body}:ListDetailProps) => {
  return (
    <div className='bg-slate-500 h-60vh w-40vw'>
        <p>Detail view is here</p>
        <p>{title}</p>
        <p>{body}</p>
        
        <div>
          
        </div>
    </div>
  )
}

export default ListDetail
