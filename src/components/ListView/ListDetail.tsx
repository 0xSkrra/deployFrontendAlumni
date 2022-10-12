import { IGroup, ITopic } from '../../common/interface/Endpoints'


const ListDetail = (props:any|/* IGroup |  */ITopic) => {
  return (
    <div className='bg-slate-500 h-60vh w-40vw'>
        <p>Detail view is here</p>
        <p>{props.item.name}</p>
        <p>{props.item.description}</p>
        <p>{props.item.users.count} follows this</p>
    </div>
  )
}

export default ListDetail