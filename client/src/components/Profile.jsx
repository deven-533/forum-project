import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import './Profile.css'
import UpdateProfile from './UpdateProfile'

const Profile = () => {
    const [isEdit, setisEdit] = useState(false);
  return (
    <>
    <Navbar/>
        <div className='profile'>
            <div className='profileinfo'>
            <div className='profilepic'>
                <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profilepic'></img>
            </div>
            <div className='profiledetails'>
                <h2>John Doe</h2>
                <p>Joined on</p>
                <div className="foll">
                <p className='followers'>XX <b> Followers</b></p>
                <p>XX <b>  Following </b></p>
                </div>

            </div>

            </div>
            <div className='editprofile'>
                <button onClick={()=>{setisEdit(true)}} className='editprobtn'>Edit Profile</button>
                {isEdit && <button className='canceledit' onClick={()=>{setisEdit(false)}}>Cancel</button>}
            </div>
            {isEdit ? <UpdateProfile/> : <div className="stats_about">
                <div className="stats">
                    <h3 className='stat'>Stats</h3>
                    <p className='ansque'>X <b> Questions</b></p>
                    <p className='ansque'>X <b>Answers </b> </p>
                </div>
                <div className="about">
                    <h3 className='abouth'>About</h3>
                    <p className='aboutinfo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, ullam ipsam? Cumque perferendis dolorum pariatur nobis, totam, ut quisquam dicta sapiente voluptatibus hic quo esse voluptate, illum explicabo quasi officia.</p>
                </div>

            </div> 
        }
        
        </div>

            
    </>
  )
}

export default Profile