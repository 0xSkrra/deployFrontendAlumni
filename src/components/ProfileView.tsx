

import React from 'react'

const ProfileView = () => {
  return (
    <>
    <div>
        <img src={"../assets/abstract-user.png"} alt="ProfilePic" className="h-10 w-10 inline"></img>
        <p>Name</p>
    </div>
    <div>
        <p>Work status</p>
        <p>fun fact</p>
        <span>bio</span>
    </div>
    </>
  )
}

export default ProfileView