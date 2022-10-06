import PostCard from './PostCard'

const TimelineComp = () => {
  return (
    <div className=" inline-flex">
        
        <div className='timeline-comp m-4'>
            <PostCard name={"Johnny Does not"} content={"Lorem ipsum is whack af bro. Lit as hell"} />
            <PostCard name={"Johnny Does maybe"} content={"Lorem ipsum is whack af bro. Lit as hell"} />
            <PostCard name={"Johnny Does"} content={"Lorem ipsum is whack af bro. Lit as hell wfmop"} />
        </div>
    </div>
  )
}

export default TimelineComp