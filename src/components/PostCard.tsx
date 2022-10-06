import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

 

 const PostCard = (props: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> 
  |ReactFragment | ReactPortal | null | undefined; content: string | number | boolean | ReactElement<any, string 
  | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {

  return (
    <div className='card-container pt-4 mg-2 pb-3'>
      <div className="card-head bg-slate-500 h-10 rounded-t-md">
          <img src="../assets/abstract-user.png" alt="ProfilePic" className="h-10 w-10 inline"></img>
          <p className="bg-slate-500 pl-3 inline">{props.name}</p>
      </div>
      <div className="card-content pl-1.5 pr-1.5 pb-1.5 shadow-lg rounded-b-lg">
        <span className="text-center">{props.content}</span>
      </div>  
    </div>
    
  )
}

PostCard.defaultProps = {
  name: "John Doe",
  image: "../assets/abstract-user.png",
  content: "Lorem Ipsum etc...",

}

export default PostCard