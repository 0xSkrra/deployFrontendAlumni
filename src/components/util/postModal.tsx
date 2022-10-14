import { Post } from "../../common/interface/Post"

interface PostModalProps{
    postToDisplay: Post
    removeModalMethod: () => void
}

const PostModal = ({postToDisplay, removeModalMethod}: PostModalProps) => {
  return (
    <div className="absolute transition ease-in-out delay-150 duration-300 top-0 left-[25%] bottom-0 w-full max-w-[55%] py-50 shadow-md overflow-x-hidden overflow-y-auto"
                id="exampleModalFullscreen"  aria-labelledby="exampleModalFullscreenLabel">
                <div className="modal-dialog modal-fullscreen  relative w-auto pointer-events-none">
                    <div
                    className="modal-content  bg-gray-100 border shadow-lg h-screen relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalFullscreenLabel">
                        {postToDisplay.title}
                        </h5>
                        <button type="button"
                        onClick={removeModalMethod}
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        >X</button>
                    </div>
                    <div className="modal-body relative p-4">
                        {postToDisplay.body}
                    </div> 
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
                    <div className="w-[75%] px-3 mb-2 mt-2">
                        <form>
                            <div className="mb-4 w-full bg-gray-100 rounded-lg border-2 border-gray-300">
                                <div className="py-2 px-4 bg-gray-100 rounded-t-lg ">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment"  rows={4} className="px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-transparent focus:border-transparent focus:ring-0" placeholder="Write a comment..." required></textarea>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 ">
                                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                                        Post comment
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mb-4 w-full bg-gray-100">
                            
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default PostModal