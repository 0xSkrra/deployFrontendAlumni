import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Group } from "../../common/interface/Group"
import { Topic } from "../../common/interface/Topic"
import {
  addGroupMember,
  addTopicMember,
  leaveGroup,
  leaveTopic,
} from "../../common/util/API"
import { useUserStore } from "../../common/util/Store/userStore"

const ListRow = (props: any) => {
  const [membership, setMembership] = useState(false)
  const [loadingbutton, setButtonLoading] = useState(false)
  const userState = useUserStore((state) => state)
  const user = useUserStore((state) => state.User)
  const pathname = window.location.pathname
  const navigate = useNavigate()

  const navigateToProp = () => {
    navigate(pathname + "/" + props.el.id)
  }

  const handleClick = () => {
    setButtonLoading(true)
    if (pathname === "/groups" && !loadingbutton) {
      const req = addGroupMember(props.el.id)
      const updatedUser = {
        ...user,
        groups: [...user.groups, props.el],
      }
      userState.setUser(updatedUser)
      req
        .then((s) =>
          s.status < 400
            ? setMembership(!membership)
            : setMembership(membership)
        )
        .finally(() => setButtonLoading(false))
    } else if (pathname === `/topics` && !loadingbutton) {
      let req = addTopicMember(props.el.id)
      const updatedUser = {
        ...user,
        topics: [...user.topics, props.el],
      }
      userState.setUser(updatedUser)
      req
        .then((s) =>
          s.status < 400
            ? setMembership(!membership)
            : setMembership(membership)
        )
        .finally(() => setButtonLoading(false))
    } else {
      alert("no action was taken since you're not in a valid spot")
    }
  }

  const handleLeave = async () => {
    setButtonLoading(true)
    if (pathname === "/groups" && !loadingbutton) {
      const req = leaveGroup(props.el.id)
      const updatedUser = {
        ...user,
        groups: userState.User.groups.filter(
          (g) => g.id !== props.el.id
        ),
      }
      userState.setUser(updatedUser)
      req
        .then((s) =>
          s.status < 400
            ? setMembership(!membership)
            : setMembership(membership)
        )
        .finally(() => setButtonLoading(false))
    } else if (pathname === `/topics` && !loadingbutton) {
      let req = leaveTopic(props.el.id)
      const updatedUser = {
        ...user,
        topics: userState.User.topics.filter(
          (t) => t.id !== props.el.id
        ),
      }
      userState.setUser(updatedUser)
      req
        .then((s) =>
          s.status < 400
            ? setMembership(!membership)
            : setMembership(membership)
        )
        .finally(() => setButtonLoading(false))
    } else {
      alert("no action was taken since you're not in a valid spot")
    }
  }

  const checkMembership = () => {
    let member: Group | Topic | undefined
    if (pathname === "/groups") {
      member = userState.User.groups.find((x) => x.id === props.el.id)
    }
    if (pathname === "/topics") {
      member = userState.User.topics.find((x) => x.id === props.el.id)
    }

    if (member !== undefined) {
      setMembership(true)
    }
  }

  if (membership === false) {
    checkMembership()
  }

  return (
    <div className="p-0 w-15 shadow-lg rounded-lg bg-slate-50">
      <div>
        <div
          className="border-2 border-gray-100 h-50 rounded-lg hover:bg-slate-300 hover:border-gray-300 hover:cursor-pointer"
          onClick={navigateToProp}
        >
          <div className="list-desc">
            <h2 className="font-bold text-xl mb-2 mx-2">
              {props.el.title}
            </h2>
            {props.el.users.length !== 1 && (
              <p className="text-left justify-start m-2">
                {props.el.users.length} members
              </p>
            )}
            {props.el.users.length === 1 && (
              <p className="text-left justify-start m-2">
                {props.el.users.length} member
              </p>
            )}
          </div>
          <div className="w-30 m-2 overflow-hidden overflow-ellipsis whitespace-prewrap h-12 listrowdescription">
            <p className="">{props.el.body}</p>
          </div>
        </div>
        <div>
          {!membership && (
            <button
              disabled={loadingbutton}
              className="bg-blue-300 text-left justify-end align-bottom m-2 px-2 py-1 rounded-md"
              onClick={() => {
                handleClick()
              }}
            >
              {!loadingbutton ? "Join Community" : "loading..."}
            </button>
          )}
          {membership && (
            <button
              disabled={loadingbutton}
              className="bg-red-300 text-left justify-end align-bottom m-2 px-2 py-1 rounded-md"
              onClick={() => {
                handleLeave()
              }}
            >
              {!loadingbutton ? "Leave Community" : "loading..."}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListRow
