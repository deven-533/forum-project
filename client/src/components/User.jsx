import React from 'react'
import './User.css'

const User = () => {

  
  return (<>
    <div className='user'>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
        <div className="userdetails">
            <h3 className='userinfo user_name'>John Doe</h3>
            <p className='userinfo'>Joined on</p>
            <p className='userinfo'><b> Followers</b></p>
        </div>
    </div>
  </>
  )
}

export default User