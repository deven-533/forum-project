import React from 'react'
import './UpdateProfile.css'

const UpdateProfile = () => {
    return (
  <>
            <div className="container">
                <div className="input">
                    <label className="name-label">
                        <p>Name : </p>
                        <input className='updateproinp' type="text" id="name" placeholder="Enter your name" required />
                    </label>
                    <label className="name-label">
                        <p>Email :</p>
                        <input className='updateproinp' type="email" id="email" placeholder="Enter your email" required />
                    </label>
                    <label className="name-label">
                        <p>Old Password :</p>
                        <input className='updateproinp' type="password" id="oldpassword" placeholder="Enter old password" required />
                    </label>
                    <label className="name-label">
                        <p>New Password :</p>
                        <input className='updateproinp' type="password" id="newpassword" placeholder="Enter new password" required />
                    </label>

                    <br/>

                        <div className="comments">
                            <p>About :</p>
                            <textarea id="text" placeholder="Write about yourself"></textarea>
                        </div>
                        <br/>
                            <button id="submit" value="submit">Submit</button>
                        </div>
                </div>
                
            </>

            )
}

            export default UpdateProfile