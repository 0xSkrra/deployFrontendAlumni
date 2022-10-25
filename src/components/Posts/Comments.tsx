import { Post } from "../../common/interface/Post"
import SingularComment from "./SingularComment"

interface commentsProps {
  comments: Post[]
  setComments: React.Dispatch<React.SetStateAction<Post[]>>
  setReplyComment: React.Dispatch<React.SetStateAction<string>>
}

const Comments = ({
  comments,
  setComments,
  setReplyComment,
}: commentsProps) => {
  const newComments = comments.map((x) => {
    return (
      <SingularComment
        key={x.id}
        comment={x}
        setReplyComment={setReplyComment}
        setComments={setComments}
      />
    )
  })

  return <div className="flex space-y-1 flex-col">{newComments}</div>
}

export default Comments
