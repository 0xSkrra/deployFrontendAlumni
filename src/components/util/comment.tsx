import { useEffect, useState } from "react"
import { Post } from "../../common/interface/Post"

interface commentsProps{
    comments: Post[]
}
interface commentRepliesProps{
  replies: Post[]
}
interface commentProps{
  comment: Post
}
const CommentReply = ({comment}: commentProps) => {

  return (
    <div className="flex">
    <div className="flex-shrink-0 mr-3">
      <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src={comment.author?.picture} alt=""/>
    </div>
    <div className="flex-1 bg-white rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>{comment.author?.username}</strong> <span className="text-xs text-gray-400">{comment.lastUpdated}</span>
      <p className="text-xs sm:text-sm">
        {comment.body}
      </p>
    </div>
  </div>
  )
}
const Comment = ({comment}: commentProps) => {
  const [replies, setReplies] = useState<React.ReactNode|React.ReactNode[]>(<></>)
  useEffect(() => {
    if(comment.replies?.length! > 1) return
    const newReplies = comment.replies?.map((c) => {
      return ( <CommentReply key={c.id} comment={c} /> )
    })
    setReplies(newReplies)
  }, [comment.replies])
  return (
  <div className="flex">
  <div className="flex-shrink-0 mr-3l">
    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comment.author?.picture} alt=""/>
  </div>

  {/* PARENT COMMENT */}
  <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed w-full">
    <strong>{comment.author?.username}</strong> <span className="text-xs text-gray-400"> on {comment.lastUpdated}</span>
    <div className="text-end">
    <span className="text-sm text-gray-400 text-end">delete</span>
    </div>
    <p className="text-sm">
      {comment.body}
    </p>
    
    <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>
    {/* Child COMMENTS GO */}
    <div className="space-y-4">
      {replies}
    </div>
  </div>
  </div>
  )
}
const Comments = ({comments}: commentsProps) => {
  console.log('second checkpoint   ', comments ,' type ' , typeof comments)
  const newComments = comments.map((x) => {
    return <Comment key={x.id} comment={x} />
  })
  
  return (
    <div className="flex space-y-3 flex-col">
      {newComments}
    </div>
  )
}

export default Comments