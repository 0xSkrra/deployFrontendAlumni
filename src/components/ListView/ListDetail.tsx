import { IGroup, ITopic } from '../../common/interface/Endpoints'


const ListDetail = (props:any|/* IGroup |  */ITopic) => {
  return (
    <div className='bg-slate-500 h-60vh w-40vw'>
        <p>Detail view is here</p>
        <p>{props.item.title}</p>
        <p>{props.item.body}</p>
        
    </div>
  )
}

export default ListDetail